// Defina a URL e a chave de API do seu projeto Supabase
const supabaseUrl = 'https://wgkakdbjxdqfdshqodtw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indna2FrZGJqeGRxZmRzaHFvZHR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM2NjQ0NzcsImV4cCI6MjAzOTI0MDQ3N30.yAEn_IPXMxK4holhx9osY8nwHPVQIuF8bPZ7_asV0KM';

// Função para consultar a tabela 'product'
async function getProducts() {
    try {
        const response = await fetch(`${supabaseUrl}/rest/v1/product`, {
            method: 'GET',
            headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const data = await response.json();

        // Pegar o container onde os elementos serão inseridos
        const featuresWrap = document.getElementById('wrap-catalog');

        data.forEach(product => {
            const featureDiv = document.createElement('div');
            featureDiv.classList.add('feature', 'text-center', 'is-revealing');
            featureDiv.style.visibility = 'visible';

            const featureInnerDiv = document.createElement('div');
            featureInnerDiv.classList.add('feature-inner');

            const featureIconDiv = document.createElement('div');
            featureIconDiv.classList.add('feature-icon');

            const img = document.createElement('img');
            img.src = product.imagem;
            img.alt = "Feature 01";
            img.height = "300";
            img.width = "250";

            featureIconDiv.appendChild(img);

            const h4 = document.createElement('h4');
            h4.classList.add('feature-title', 'mt-24');
            h4.textContent = product.nome;

            const pShipping = document.createElement('p');
            if (product.dias_para_entrega > 0) {
                pShipping.classList.add('text-sm', 'mb-0', 'wait-shipping');
                pShipping.textContent = "Entrega em " + product.dias_para_entrega + " dias!";
            } else {
                pShipping.classList.add('text-sm', 'mb-0', 'already-shipping');
                pShipping.textContent = "Pronta Entrega!";
            }

            const pDescription = document.createElement('p');
            pDescription.classList.add('text-sm', 'mb-0');
            pDescription.textContent = product.descricao;

            const h2Price = document.createElement('h2');
            h2Price.classList.add('feature-title', 'mt-24');
            h2Price.textContent = `R$ ${product.preco}`;

            const buyButton = document.createElement('a');
            buyButton.classList.add('button', 'button-primary');
            buyButton.href = `https://wa.me/14997598823?text='Quero o produto ${product.nome}'`;
            buyButton.target = '_blank';
            buyButton.textContent = 'Comprar';

            featureInnerDiv.appendChild(featureIconDiv);
            featureInnerDiv.appendChild(h4);
            featureInnerDiv.appendChild(pShipping);
            featureInnerDiv.appendChild(pDescription);
            featureInnerDiv.appendChild(h2Price);
            featureInnerDiv.appendChild(buyButton);

            featureDiv.appendChild(featureInnerDiv);

            featuresWrap.appendChild(featureDiv);
        });
    } catch (err) {
        console.error('Erro ao conectar com o Supabase:', err);
    }
}

getProducts();
