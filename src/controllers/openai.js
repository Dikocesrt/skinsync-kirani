const { OpenAI } = require('openai');
const { History } = require('../models/index');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const analyzeSkin = async (req, res) => {
  const { age, gender, activity, description } = req.body;

  const prompt = `
Kamu adalah asisten yang hanya merespons dengan JSON murni. Berdasarkan informasi berikut:

- Umur: ${age}
- Gender: ${gender}
- Kegiatan sehari-hari: ${activity}
- Deskripsi kulit: ${description}

Tentukan tipe kulit wajah pengguna (kulit sensitif, kulit normal, kulit kombinasi, kulit kering, kulit berminyak) dan berikan penjelasan singkat. Jawaban HARUS HANYA dalam format JSON valid, tanpa teks tambahan:

{
  "tipe": "kulit sensitif",
  "penjelasan": "Penjelasan satu paragraf mengenai tipe kulit.",
  "perawatan": "Penjelasan satu paragraf mengenai perawatan kulit.",
  "bahan": "Rekomendasi bahan yang digunakan dan dihindari."
}

Hanya berikan objek JSON valid, tanpa markdown atau tambahan teks apa pun.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    let responseText = completion.choices[0].message.content.trim();

    // Ambil bagian JSON dari isi response
    const match = responseText.match(/{[\s\S]*}/);
    if (!match) {
      return res.status(500).json({ error: 'Tidak menemukan JSON dalam response.', raw: responseText });
    }

    // Parse dengan aman
    const json = JSON.parse(match[0]);
    const { tipe, penjelasan, perawatan, bahan } = json;

    const normalizedTipe = tipe.trim().toLowerCase();
    console.log('TIPE KULIT => ' + normalizedTipe);
    var skin_type_id;
    if (normalizedTipe === 'kulit kering') {
        skin_type_id = 1;
    } else if (normalizedTipe === 'kulit sensitif') {
        skin_type_id = 2;
    } else if (normalizedTipe === 'kulit kombinasi') {
        console.log('MASUK TIPE KULIT KOMBINASI');
        skin_type_id = 3;
    } else if (normalizedTipe === 'kulit berminyak') {
        skin_type_id = 4;
    } else if (normalizedTipe === 'kulit normal') {
        skin_type_id = 5;
    } else {
        console.warn('Tipe kulit tidak dikenali:', tipe);
    }

    // Simpan ke DB
    await History.create({
      age,
      gender,
      activity,
      content: description,
      result: penjelasan,
      treatment: perawatan,
      ingredient: bahan,
      skin_type_id: skin_type_id,
      user_id: req.session.user.id,
    });

    return res.status(200).json({ tipe, penjelasan, perawatan, bahan });
  } catch (error) {
    console.error('OpenAI or Parsing Error:', error);
    return res.status(500).json({ error: 'Terjadi kesalahan.', raw: error.message });
  }
};

module.exports = { analyzeSkin };
