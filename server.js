require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(express.static(__dirname));
app.use(cors()); 
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/', (req, res) => {
    res.send('API do Buscador de Filmes rodando com sucesso!');
});

app.get('/api/movies', async (req, res) => {

    const query = req.query.search;

    if (!query) {
        return res.status(400).json({ error: 'Termo de busca é obrigatório' });
    }

    try {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
                api_key: process.env.TMDB_API_KEY,
                query: query,
                language: 'pt-BR'
            }
    });

    res.json(response.data.results);
    }catch (error) {
        res.status(500).json({ error: 'Erro ao buscar filmes no servidor' });
    }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});