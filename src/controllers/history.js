const { History, Product, Article, SkinType } = require("../models/index");
const getURL = require("../helpers/getImage");

const detailHistory = async (req, res) => {
    const { id } = req.params;
    // const isHistory = req.
    const history = await History.findOne({ 
        include: [
            { model: SkinType, as: "skin_type" },
        ],
        where: { 
            id
        } 
    });

    const plainHistory = history.get({ plain: true });

    if(plainHistory.skin_type.image){
        plainHistory.skin_type.image = getURL(plainHistory.skin_type.image, 450, 415);
    }

    const products = await Product.findAll({
        limit: 6,
        include: [
            { model: SkinType, as: "skin_type" },
        ],
        where: { skin_type_id: history.skin_type_id } 
    });

    const plainProducts = products.map((product) => product.get({ plain: true }));

    plainProducts.forEach((product) => {
        if (product.image) {
            product.image = getURL(product.image, 250, 200);
            product.detailImage = getURL(product.image, 800, 300);
        }
    });

    const articles = await Article.findAll({
        limit: 4,
         where: { skin_type_id: history.skin_type_id } });

    const plainArticles = articles.map((article) => article.get({ plain: true }));

    plainArticles.forEach((article) => {
        if (article.image) {
            article.image = getURL(article.image, 350, 200);
        }
    });

    const createdAt = history.createdAt.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    let bahanDipakai;
    let bahanDihindari;
    if (history.skin_type.id === 1) {
       bahanDipakai = ["Hyaluronic Acid (Melembabkan kulit secara intens)", "Ceramide (Mencegah Kehilangan kelembaban)", "Glycerin (Menjaga kelembaban kulit)", "Shea Butter (Melembutkan dan menenangkan kulit kering)", "Squalane (Menghidrasi tanpa menyumbat pori)"];
       bahanDihindari = ["Alcohol Denat (Mengeringkan kulit secara berlebihan)", "Fragrance (Berpotensi menyebabkan iritasi)", "Benzoyl Peroxide dosis tinggi (Memicu pengelupasan dan iritasi)", "Salicylic Acid dosis tinggi (Terlalu keras untuk kulit kering)", "Clay Mask berlebih (Menyerap minyak alami secara berlebihan)"];
    } else if (history.skin_type.id === 2) {
        bahanDipakai = [
            "Centella Asiatica (Menenangkan kulit dan meredakan kemerahan)", 
            "Aloe Vera (Menyejukkan dan anti-inflamasi)", 
            "Panthenol/Vitamin B5 (Menghidrasi dan memperkuat pelindung kulit)", 
            "Madecassoside (Membantu regenerasi kulit)", 
            "Ceramide (Memperkuat skin barrier dan menenangkan kulit)"
        ];
        bahanDihindari = [
            "Fragrance/Parfum (Pemicu iritasi dan alergi)", 
            "Essential Oils berlebihan (Berpotensi menyebabkan alergi)", 
            "Alcohol Denat (Menimbulkan perih dan kulit kering)", 
            "AHA/BHA tinggi (Terlalu keras bagi kulit sensitif)", 
            "Retinol dosis tinggi (Memicu kemerahan jika belum terbiasa)"
        ];
    } else if (history.skin_type.id === 3) {
        bahanDipakai = [
            "Niacinamide (Mengontrol minyak di T-zone dan menjaga kelembapan di pipi)", 
            "Hyaluronic Acid (Melembapkan tanpa membuat berminyak)", 
            "Green Tea Extract (Mengontrol sebum dan menenangkan kulit)", 
            "Salicylic Acid ringan (Membersihkan pori-pori tanpa membuat kulit kering)", 
            "Allantoin (Menenangkan dan melembutkan area kering)"
        ];
        bahanDihindari = [
            "Produk sangat oklusif (Menyumbat pori di area berminyak)", 
            "Alcohol Denat (Mengiritasi area kering)", 
            "Fragrance tinggi (Potensi iritasi)", 
            "Mineral Oil (Berpotensi menyumbat pori)", 
            "Scrub kasar (Mengiritasi dan merusak lapisan kulit)"
        ];
    } else if (history.skin_type.id === 4) {
        bahanDipakai = [
            "Salicylic Acid (Membersihkan pori dan mengurangi jerawat)", 
            "Niacinamide (Mengontrol minyak dan mengecilkan pori)", 
            "Zinc PCA (Mengurangi produksi sebum)", 
            "Tea Tree Oil (Antibakteri alami untuk jerawat)", 
            "Kaolin Clay (Menyerap minyak berlebih dan mengurangi kilap)"
        ];
        bahanDihindari = [
            "Coconut Oil (Mudah menyumbat pori)", 
            "Lanolin (Komedogenik dan memicu jerawat)", 
            "Petrolatum berlebih (Terlalu berat untuk kulit berminyak)", 
            "Alcohol Denat (Memicu produksi minyak berlebih)", 
            "Heavy Cream (Formula berat dan lengket)"
        ];
    } else if (history.skin_type.id === 5) {
        bahanDipakai = [
            "Niacinamide (Menjaga keseimbangan kulit)", 
            "Hyaluronic Acid (Menghidrasi agar tetap lembap dan kenyal)", 
            "Vitamin C (Mencerahkan dan melindungi kulit dari radikal bebas)", 
            "Ceramide (Menjaga pelindung kulit tetap kuat)", 
            "Green Tea Extract (Menyeimbangkan kulit dan melawan polusi)"
        ];
        bahanDihindari = [
            "Retinol tinggi (Bisa memicu iritasi jika tidak dibutuhkan)", 
            "AHA/BHA berlebihan (Mengganggu keseimbangan kulit)", 
            "Fragrance tinggi (Berpotensi menyebabkan iritasi)", 
            "Alcohol Denat (Berisiko mengeringkan kulit)", 
            "Produk berat berlebih (Tidak diperlukan jika kulit sudah seimbang)"
        ];
    }

    res.render("histories/detail", { history: plainHistory, products: plainProducts, articles: plainArticles, createdAt, user: req.session.user, bahanDipakai, bahanDihindari });
};

module.exports = { detailHistory };