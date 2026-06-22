// JavaScript for Consultation Form

document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const consultationForm = document.getElementById('consultationForm');
    const consultationType = document.getElementById('consultationType');
    const otherTypeGroup = document.getElementById('otherTypeGroup');
    const otherType = document.getElementById('otherType');
    const consultationFee = document.getElementById('consultationFee');
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Set consultation fee based on type
    if (consultationType) {
        consultationType.addEventListener('change', function() {
            const selectedType = this.value;
            
            // Show/hide "Other" field
            if (selectedType === 'other') {
                otherTypeGroup.style.display = 'block';
                otherType.setAttribute('required', 'required');
            } else {
                otherTypeGroup.style.display = 'none';
                otherType.removeAttribute('required');
            }
            
            // Set fee based on consultation type
            let fee = '-- ريال سعودي';
            
            switch(selectedType) {
                case 'industry-energy':
                    fee = '1500 ريال سعودي';
                    break;
                case 'entertainment-cinema':
                    fee = '1200 ريال سعودي';
                    break;
                case 'real-estate-contracting':
                    fee = '1300 ريال سعودي';
                    break;
                case 'finance-banking':
                    fee = '1500 ريال سعودي';
                    break;
                case 'labor-employment':
                    fee = '1000 ريال سعودي';
                    break;
                case 'healthcare-insurance':
                    fee = '1200 ريال سعودي';
                    break;
                case 'other':
                    fee = '1000 ريال سعودي';
                    break;
                default:
                    fee = '-- ريال سعودي';
            }
            
            consultationFee.textContent = fee;
        });
    }
    
    // Form validation
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = consultationForm.querySelectorAll('[required]');
            
            // Remove previous error messages
            const errorMessages = consultationForm.querySelectorAll('.error-message');
            errorMessages.forEach(message => message.remove());
            
            // Check required fields
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Add error message
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'هذا الحقل مطلوب';
                    field.parentNode.appendChild(errorMessage);
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Validate email format
            const emailField = document.getElementById('email');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                    
                    // Add error message
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'يرجى إدخال بريد إلكتروني صحيح';
                    emailField.parentNode.appendChild(errorMessage);
                }
            }
            
            // Validate phone format
            const phoneField = document.getElementById('phone');
            if (phoneField && phoneField.value.trim()) {
                const phonePattern = /^(\+\d{1,3})?[\s.-]?\d{3}[\s.-]?\d{3}[\s.-]?\d{4}$/;
                if (!phonePattern.test(phoneField.value)) {
                    isValid = false;
                    phoneField.classList.add('error');
                    
                    // Add error message
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'يرجى إدخال رقم هاتف صحيح';
                    phoneField.parentNode.appendChild(errorMessage);
                }
            }
            
            // If form is valid, show success message
            if (isValid) {
                // Update progress steps
                document.querySelector('.step:nth-child(1)').classList.add('completed');
                document.querySelector('.step:nth-child(2)').classList.add('active');
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'تم استلام طلبك بنجاح. سيقوم فريقنا بمراجعة التحويل البنكي والتواصل معك خلال 24 ساعة لتأكيد موعد الاستشارة.';
                
                consultationForm.appendChild(successMessage);
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth' });
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    consultationForm.reset();
                    successMessage.remove();
                    
                    // Reset progress steps
                    document.querySelector('.step:nth-child(1)').classList.remove('completed');
                    document.querySelector('.step:nth-child(2)').classList.remove('active');
                    document.querySelector('.step:nth-child(1)').classList.add('active');
                    
                    // Reset consultation fee
                    consultationFee.textContent = '-- ريال سعودي';
                    
                    // Hide other type field
                    otherTypeGroup.style.display = 'none';
                }, 5000);
            }
        });
    }
    
    // FAQ accordion
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // File upload validation
    const attachmentsInput = document.getElementById('attachments');
    const transferReceiptInput = document.getElementById('transferReceipt');
    
    if (attachmentsInput) {
        attachmentsInput.addEventListener('change', function() {
            validateFileUpload(this, 5, 5 * 1024 * 1024, ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png']);
        });
    }
    
    if (transferReceiptInput) {
        transferReceiptInput.addEventListener('change', function() {
            validateFileUpload(this, 1, 2 * 1024 * 1024, ['jpg', 'jpeg', 'png', 'pdf']);
        });
    }
    
    // Function to validate file uploads
    function validateFileUpload(input, maxFiles, maxSize, allowedTypes) {
        const files = input.files;
        let isValid = true;
        
        // Remove previous error messages
        const errorMessages = input.parentNode.querySelectorAll('.error-message');
        errorMessages.forEach(message => message.remove());
        
        // Check number of files
        if (files.length > maxFiles) {
            isValid = false;
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = `الحد الأقصى للملفات هو ${maxFiles} ملفات`;
            input.parentNode.appendChild(errorMessage);
        }
        
        // Check file size and type
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileExtension = file.name.split('.').pop().toLowerCase();
            
            // Check file size
            if (file.size > maxSize) {
                isValid = false;
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = `حجم الملف ${file.name} يتجاوز الحد المسموح به`;
                input.parentNode.appendChild(errorMessage);
            }
            
            // Check file type
            if (!allowedTypes.includes(fileExtension)) {
                isValid = false;
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = `نوع الملف ${file.name} غير مسموح به`;
                input.parentNode.appendChild(errorMessage);
            }
        }
        
        // Reset input if not valid
        if (!isValid) {
            input.value = '';
        }
    }
});
