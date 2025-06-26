// EmailJS Configuration for D&G Webworks
// Updated with actual working credentials

const EMAILJS_CONFIG = {
    publicKey: 'M8mHzPyM_hiH1Ud6_',     // Your EmailJS Public Key
    serviceId: 'service_t8m0x6q',       // Your Gmail service ID
    templateId: 'template_zssqzhw'      // Your email template ID
};

// Debug configuration (remove in production)
console.log('📧 EmailJS Configuration Loaded:');
console.log('- Public Key:', EMAILJS_CONFIG.publicKey ? '✅ Set' : '❌ Missing');
console.log('- Service ID:', EMAILJS_CONFIG.serviceId ? '✅ Set' : '❌ Missing');
console.log('- Template ID:', EMAILJS_CONFIG.templateId ? '✅ Set' : '❌ Missing');

// Make configuration available globally
window.EMAILJS_CONFIG = EMAILJS_CONFIG;

// Additional configuration validation
if (typeof window !== 'undefined') {
    // Validate configuration on load
    setTimeout(() => {
        const config = window.EMAILJS_CONFIG;
        const isConfigured = config && 
            config.publicKey && config.publicKey !== 'YOUR_PUBLIC_KEY' &&
            config.serviceId && config.serviceId !== 'YOUR_SERVICE_ID' &&
            config.templateId && config.templateId !== 'YOUR_TEMPLATE_ID';

        if (isConfigured) {
            console.log('✅ EmailJS configuration is properly set up');
        } else {
            console.error('❌ EmailJS configuration is incomplete or contains placeholder values');
        }
    }, 100);
}
