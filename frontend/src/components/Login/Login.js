import React, { useState } from "react";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        nome: "",
        funcao: "",
        cargo: "",
        departamento: "",
        setor: "",
        celula: "",
        senha: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Dados do formulário:", formData);
        // Aqui você pode enviar os dados para o backend
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>E-mail:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Função:</label>
                    <input
                        type="text"
                        name="funcao"
                        value={formData.funcao}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Cargo:</label>
                    <input
                        type="text"
                        name="cargo"
                        value={formData.cargo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Departamento:</label>
                    <select
                        name="departamento"
                        value={formData.departamento}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="Comercial">Comercial</option>
                        <option value="Negocios">Negócios</option>
                        <option value="Tecnologia">Tecnologia</option>
                    </select>
                </div>
                <div>
                    <label>Setor:</label>
                    <input
                        type="text"
                        name="setor"
                        value={formData.setor}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Célula:</label>
                    <input
                        type="text"
                        name="celula"
                        value={formData.celula}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        name="senha"
                        value={formData.senha}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default Login;