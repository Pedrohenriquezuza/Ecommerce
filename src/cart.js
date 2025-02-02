document.addEventListener("DOMContentLoaded", () => {
  const cart = document.getElementById("cart");
  const closeCartBtn = document.getElementById("btn-closeCart");
  const cartItems = document.querySelector(".items-cart");
  let carrinho = [];

  // Função para adicionar eventos nos produtos
  function ativarEventosProdutos() {
    document.querySelectorAll(".produto-card").forEach((productCard) => {
      productCard.addEventListener("click", () => {
        const product = {
          title: productCard.querySelector("span").innerText,
          price: productCard.querySelector(".font-bold").innerText,
          image: productCard.querySelector("img").src,
        };

        addToCart(product);
      });
    });
  }

  function addToCart(product) {
    carrinho.push(product);
    renderCart();
    cart.classList.remove("translate-x-full");
  }

  function renderCart() {
    cartItems.innerHTML = "";
    let subtotal = 0;

    carrinho.forEach((item, index) => {
      // Remover qualquer caractere extra e converter para float
      const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
      console.log(`Preço do item ${item.title}:`, price); // Verificar o valor de price

      if (isNaN(price)) {
        console.error("Preço inválido:", item.price);
      }

      subtotal += price;

      cartItems.innerHTML += `
        <div class="flex items-center gap-4 mt-5 border-b py-4 px-4 bg-white rounded-lg shadow-md">
          <img src="${item.image}" class="w-16 h-16 object-contain rounded">
          <div class="flex-1">
            <h4 class="text-md font-semibold text-gray-800">${item.title}</h4>
            <p class="text-lg font-bold text-green-600">$${price.toFixed(2)}</p>
          </div>
          <button class="cursor-pointer remove-item text-red-500 text-lg font-bold" data-index="${index}">&times;</button>
        </div>
      `;
    });

    const desconto = subtotal * 0.1;
    const total = subtotal - desconto;

    cartItems.innerHTML += `
      <div class="p-4 bg-white rounded-lg shadow-md mt-4">
        <div class="flex justify-between text-md font-semibold text-gray-800">
          <span>Subtotal:</span>
          <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="flex justify-between text-md font-semibold text-red-500">
          <span>Desconto (10%):</span>
          <span>-$${desconto.toFixed(2)}</span>
        </div>
        <hr class="my-2">
        <div class="flex justify-between text-lg font-bold text-green-600">
          <span>Total:</span>
          <span>$${total.toFixed(2)}</span>
        </div>
        <button class="cursor-pointer bg-green-600 text-white text-xl p-2 rounded-md mt-2">Finalizar Compra</button>
      </div>
    `;

    document.querySelectorAll(".remove-item").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        carrinho.splice(index, 1);
        renderCart();
      });
    });
  }

  closeCartBtn.addEventListener("click", () => {
    cart.classList.add("translate-x-full");
  });

  window.ativarEventosProdutos = ativarEventosProdutos;
});
