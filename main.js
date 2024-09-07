// Defina a URL e a chave de API do seu projeto Supabase
const supabaseUrl = 'https://wgkakdbjxdqfdshqodtw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indna2FrZGJqeGRxZmRzaHFvZHR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM2NjQ0NzcsImV4cCI6MjAzOTI0MDQ3N30.yAEn_IPXMxK4holhx9osY8nwHPVQIuF8bPZ7_asV0KM';

// Função para consultar a tabela 'product'
async function getProducts() {
    try {
        // Configuração da requisição HTTP com o método GET
        const response = await fetch(`${supabaseUrl}/rest/v1/product`, {
            method: 'GET',
            headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'  // Isso é opcional, depende de como você quer a resposta
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        // Converter resposta para JSON
        const data = await response.json();
        console.log('Produtos:', data);
        // Aqui você pode manipular os dados, como exibir na página

    } catch (err) {
        console.error('Erro ao conectar com o Supabase:', err);
    }
}

// Chame a função para buscar os produtos
getProducts();
