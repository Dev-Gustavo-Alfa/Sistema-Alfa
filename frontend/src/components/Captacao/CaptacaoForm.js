import React, { useEffect, useState } from 'react'
import axios from 'axios'
function CaptacaoForm(props) {
    const [captacao, setCaptacao] = useState({tipo_captacao: "Mediata"})
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [id, setId] = useState(props.id)
    useEffect(() => {
      console.log(captacao)
    }, [captacao])
    const verifyData = (data) => {
      const dataChecked = {}
      if(data.data_captacao) data.data_captacao = new Date(data.data_captacao+ ' ').toISOString()
      Object.keys(data).forEach((e) => (data[e].length) ? dataChecked[e] = data[e]: false)
      return dataChecked
    }
    const updateCaptacao = async (e) => {
        e.preventDefault();
        setCaptacao({ ...captacao, contato: `${email ? email : ''}/${phone ? phone: ''}`})
        const checkedData = verifyData(captacao)
        console.log(checkedData)
        try {
          const {data} = await axios.put(`http://localhost:3001/captacao/${id}`, captacao)
          console.log(data)
        } catch (error) {
          console.log(error)
        }
      }
  return (
    <form onSubmit={updateCaptacao}>
      <label>
          Data de Captação:
          <input type="date" onChange={(e) => setCaptacao({...captacao, ["data_captacao"]: e.target.value})} />
        </label>
        <label>
          Processo:
          <input type="text" onChange={(e) => setCaptacao({...captacao, ["processo"]: e.target.value})} />
        </label>
        <label>
          Termo de Busca:
          <input type="text" onChange={(e) => setCaptacao({...captacao, ["termo_busca"]: e.target.value})} />
        </label>
        <label>
          Tipo de Captação
          <select onChange={(e) => setCaptacao({...captacao, ["tipo_captacao"]: e.target.value })}>
            <option value="Mediata">Mediata</option>
            <option value="Imediata">Imediata</option>
            <option value="Espontânea">Espontânea</option>
          </select>
        </label>
        <label>
          Exequente:
          <input type="text" onChange={(e) => setCaptacao({...captacao, ["exequente"]: e.target.value})} />
        </label>
        <label>
          Responsável:
          <input type="text" onChange={(e) => setCaptacao({...captacao, ["responsavel"]: e.target.value})} />
        </label>
        <label>
          Telefone
          <input type="text" onChange={(e) => setPhone(e.target.value)} />
        </label>
        <label>
          Email
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Observações:
          <input type="text" onChange={(e) => setCaptacao({...captacao, ["observacoes"]: e.target.value})} />
        </label>
        <label>
          Ligação Frutífera:
          <input type="text" onChange={(e) => setCaptacao({...captacao, ["ligacao_frutifera"]: e.target.value})} />
        </label>
        <label>
          Número de Imóveis:
          <input type="text" onChange={(e) => setCaptacao({...captacao, ["num_imoveis"]: e.target.value})} />
        </label>
        <button>Cadastrar Nova Captação</button>
    </form>
  )
}
export default CaptacaoForm