function daysTillEndYear() {
    const today = new Date();
    const endOfYear = new Date(today.getFullYear(), 11, 31); // 31 de dezembro do ano atual

    const diffTime = endOfYear - today; // Diferença em milissegundos
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 1 dia em milissegundos

    return diffDays;
}

function dataParsing(data) {

    const outputDiv = document.getElementById('apiOutput');
    outputDiv.innerHTML = ''; // Limpar saída anterior

    if (data && data.profiles) {
        const profiles = Object.keys(data.profiles).map(key => ({
            name: data.profiles[key].cute_name,
            details: data.profiles[key] // Guardamos os detalhes do perfil
        }));

        const buttonContainer = document.createElement('div'); // Div para os botões
        buttonContainer.id = 'buttonContainer';

        profiles.forEach(profile => {
            const button = document.createElement('button');
            button.textContent = profile.name;
            button.addEventListener('click', () => renderProfile(profile.details));
            buttonContainer.appendChild(button);
        });

        outputDiv.appendChild(buttonContainer);

        // Criar um espaço para exibir os detalhes do perfil
        const profileDetailsDiv = document.createElement('div');
        profileDetailsDiv.id = 'profileDetails';
        outputDiv.appendChild(profileDetailsDiv);
    } else {
        outputDiv.innerHTML = 'No valid data found';
    }
}

// Função que renderiza os detalhes do perfil selecionado
function renderProfile(profile) {
    const constDaysTillEndYear = daysTillEndYear();
    const detailsDiv = document.getElementById('profileDetails');
    var coin_purse = profile.raw.currencies.coin_purse || 'N/A';
    renderCollections(profile);
    //var collection_oak = profile.raw.collection.LOG || 'N/A';

    // Tratar o número para ter nenhuma casa decimal e separadores de milhar
    var coin_goal = 10000000000;
    var coins_per_day = (coin_goal - coin_purse) / constDaysTillEndYear;
    coin_purse = coin_purse.toLocaleString('en-US', { maximumFractionDigits: 0 });
    coins_per_day = coins_per_day.toLocaleString('en-US', { maximumFractionDigits: 0 });
    collection_oak = collection_oak.toLocaleString('en-US', { maximumFractionDigits: 0 });
    // Mostrar os detalhes do perfil
    detailsDiv.innerHTML = `
        <h3>Profile: ${profile.cute_name}</h3>
        <p><strong>Coin Purse:</strong> ${coin_purse}</p>
    `;
}

function renderCollections(profile) {
    const detailsDiv = document.getElementById('profileDetails');

    if (!profile.raw || !profile.raw.collection) {
        detailsDiv.innerHTML = "<p><strong>No collection data available</strong></p>";
        return;
    }

    const collections = profile.raw.collection; // Obtém todas as coleções
    let collectionHTML = "<h3>Collections:</h3>";

    Object.keys(collections).forEach(key => {
        let value = collections[key] || 'N/A';
        value = typeof value === "number" ? value.toLocaleString('en-US', { maximumFractionDigits: 0 }) : value;
        
        collectionHTML += `<p><strong>${key.replace(/_/g, ' ')}:</strong> ${value}</p>`;
    });

    detailsDiv.innerHTML = collectionHTML;
}

export { dataParsing };
