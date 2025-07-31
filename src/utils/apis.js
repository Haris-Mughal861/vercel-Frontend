const apis = () => {
  const local = 'http://localhost:5052';

  return {
    // ==== USER ====
    loginUser: `${local}/user/login`,
    requestUserCode: `${local}/user/request-code`,
    verifyUserAndRegister: `${local}/user/verify-and-register`,

    // ==== SELLER ====
    requestSellerCode: `${local}/seller/request-code`,
    verifySellerAndRegister: `${local}/seller/verify-and-register`,
    sellerDashboard: `${local}/seller/dashboard`,
    sellerAddProduct: `${local}/seller/add-product`,
    sellerAddBlog: `${local}/api/seller/add-blog`,
    getBlogs: `${local}/api/blogs`,
    getSellerBlogs: `${local}/api/seller/blogs`,
    getMyBlog: `${local}/api/seller/my-blog`,
    deleteSellerBlog: (id) => `${local}/api/seller/delete-blog/${id}`,

    // ==== PASSWORD RESET ====
    userRequestResetCode: `${local}/user/request-reset`,
    userVerifyResetCode: `${local}/user/verify-reset`,
    userResetPassword: `${local}/user/reset-password`,
    sellerRequestResetCode: `${local}/seller/request-reset`,
    sellerVerifyResetCode: `${local}/seller/reset-password`,

    // ==== PRODUCT ====
    addProduct: `${local}/product/add`,
    getAllProducts: `${local}/product/get`,
    getProductById: `${local}/product/get`,
    getProductSearch: (query) => `${local}/product/search?q=${query}`,
    getProductsByCategory: (id) => `${local}/product/by-category/${id}`,
    rateProduct: `${local}/product/rate`,

    // ==== CART ====
    addToCart: `${local}/cart/add`,
    getUserCart: `${local}/cart/get`,
    deleteCart: `${local}/cart/delete`,

    // ==== STRIPE PAYMENT ====
    makeStripePayment: `${local}/api/payment/pay`,

    // ==== BRAND & CATEGORY ====
    addNewBrand: `${local}/brand/add`,
    addNewCategory: `${local}/category/add`,
    getBrandDropdown: `${local}/dropdown/brand`,
    getCategoryDropdown: `${local}/dropdown/category`,

    // ==== ADMIN ====
    allSellers: `${local}/api/admin/all-sellers`,
    blockSeller: `${local}/api/admin/block-seller`,
    allLogins: `${local}/api/admin/login-logs`,

    // ==== BANNER ====
    updateBanner: `${local}/api/banner`,
    getBanner: `${local}/api/banner`,
    getBanners: `${local}/api/banner`,

    // ==== AI ====
    getProductRecommendations: `${local}/product/recommendations`,

    // ==== IMAGE UPLOAD ====
    imageUpload: `${local}/image/upload`,
  };
};

export default apis;
