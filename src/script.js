const URL = "https://fakestoreapi.com/products/";

async function gerarProdutosDaApi() {
  const resp = await fetch(URL);
  if (resp.status === 200) {
    const obj = await resp.json();
    let containerDosProdutos = document.getElementById("main-products");
    console.log(obj);

    obj.forEach((produto) => {
      const divProduto = document.createElement("div");
      divProduto.classList.add(
        "produto",
        "bg-white",
        "p-4",
        "rounded-xl",
        "shadow-md",
        "flex",
        "flex-col",
        "items-center",
        "justify-between",
        "h-auto"
      );

      const produtoTitle =
        produto.title.length > 10
          ? produto.title.slice(0, 30) + "..."
          : produto.title;

      divProduto.innerHTML = `<img
          src="${produto.image}"
          alt="${produtoTitle}"
          class="w-32 p-3 bg-white rounded-xl"
        />

        <div class="flex flex-col mb-0.5">
          <span class="text-[#1A1F16]">${produtoTitle}</span>
          <span class="text-xs text-[#60695C]">${produto.category}</span>
        </div>

        <div class="flex gap-9 py-1 text-center items-center">
          <div class="font-bold">$${produto.price}</div>

          <i
            class="fa-solid fa-cart-shopping text-white bg-black p-2 rounded-md"
          ></i>
        </div>`;

      containerDosProdutos.appendChild(divProduto);
    });
  }
}

gerarProdutosDaApi();
