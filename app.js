document.addEventListener('DOMContentLoaded', function() {
    // Menangani peristiwa submit formulir login
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah pengiriman formulir default

        // Mendapatkan nilai input
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        // Email dan password yang ingin Anda gunakan
        var validEmail = "nazalasyifa@gmail.com";
        var validPassword = "233307085";

        // Validasi login
        if (email === validEmail && password === validPassword) {
            Swal.fire({
                icon: 'success',
                title: 'Thank you!',
                text: 'Your details have been successfully submitted.',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                backdrop: `
                    rgba(0,0,123,0.4)
                    url("/assets/green-check-icon.png")
                    left top
                    no-repeat
                `,
                customClass: {
                    popup: 'popup-class',
                    confirmButton: 'confirm-button-class'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "order.html";
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed!',
                text: 'Incorrect email or password.',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                backdrop: `
                    rgba(123, 0, 0, 0.4)
                    url("/assets/red-cross-icon.png")
                    left top
                    no-repeat
                `,
                customClass: {
                    popup: 'popup-class',
                    confirmButton: 'confirm-button-class'
                }
            });
            document.getElementById('password').value = ''; // Mengosongkan input password
            document.getElementById('password').focus(); // Fokus kembali ke input password
        }
    });
});


// Function to initialize order feature
document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.item');
    const totalSpan = document.getElementById('total');
    let totalPrice = 0;

    items.forEach(item => {
        const itemName = item.dataset.name;
        const itemPrice = parseInt(item.dataset.price);

        const quantitySpan = document.createElement('span');
        quantitySpan.classList.add('quantity');
        quantitySpan.textContent = '0';

        const btnMinus = document.createElement('button');
        btnMinus.classList.add('btn-minus');
        btnMinus.textContent = '-';
        btnMinus.addEventListener('click', () => {
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity > 0) {
                quantity--;
                quantitySpan.textContent = quantity;
                totalPrice -= itemPrice; // Kurangi harga item saat tombol minus diklik
                updateTotal();
            }
        });

        const btnPlus = document.createElement('button');
        btnPlus.classList.add('btn-plus');
        btnPlus.textContent = '+';
        btnPlus.addEventListener('click', () => {
            let quantity = parseInt(quantitySpan.textContent);
            quantity++;
            quantitySpan.textContent = quantity;
            updateTotal(); // Tidak menambahkan harga total saat tombol plus diklik
        });

        const quantityControls = document.createElement('div');
        quantityControls.classList.add('quantity-controls');
        quantityControls.appendChild(btnMinus);
        quantityControls.appendChild(quantitySpan);
        quantityControls.appendChild(btnPlus);

        // Membuat tampilan tombol plus dan minus berada di sebelah kanan menu
        quantityControls.style.marginLeft = 'auto';

        // Menambahkan quantityControls setelah item
        item.appendChild(quantityControls);

        item.addEventListener('click', () => {
            item.classList.toggle('selected');
        });
    });

    function updateTotal() {
        let total = 0;
        items.forEach(item => {
            const quantity = parseInt(item.querySelector('.quantity').textContent);
            const itemPrice = parseInt(item.dataset.price);
            total += quantity * itemPrice;
        });
        totalPrice = total;
        totalSpan.textContent = "Total: Rp." + totalPrice.toLocaleString();
    }
});




