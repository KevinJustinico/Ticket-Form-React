
    import { useState } from "react";
    import "../App.css"
    function Formulario() {
    
      const [title, setTitle] = useState('');
      const [priority, setPriority] = useState(1);
      const [description, setDescription] = useState('');
      const [formErrors, setFormErrors] = useState({});
      
      const handleTitleChange = (e) => {
        const {name, value} = e.target;
        setTitle(value);
        validateField(name, value);
      }

      const handlePriorityChange = (e) => {
        const {name, value} = e.target;
        setPriority(value);
        validateField(name, value);
      }
      
      const handleDescriptionChange = (e) => {
        const {name, value} = e.target;
        setDescription(value);
        validateField(name, value);
      }

      const validateField = (name, value) => {
        let errors =  { ...formErrors };

        switch(name) {
          case "title":
            if (value.length < 6 || value.length > 18 ){
              errors [name] = "must be between 6 and 18 characters.";
            } else {
              errors [name] = "";
            }
            break;
          case "description":
            if (value.length < 30 ){
              errors [name] = "30 characters max.";
            } else {
              errors [name] = "";
            }
            break;
          default:
            errors[name] = "";
        }

        setFormErrors(errors);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
          title,
          priority,
          description
        };

        try {

          const response = await fetch('http://localhost:3000/tickets', {
            method: 'POST',
            headers: {
              'Content-type': 'aplication/json'
            },
            body: JSON.stringify(formData)
          });
          
          if(!response.ok) {
            throw new Error('Failed to submit from');
          }

          const newTicket = await response.json();
          console.log('Form created successfully: ', newTicket);

          setTitle("");
          setPriority(1);
          setDescription("");
          
        } catch (error) {
          console.error('Error submitting form: ', error.message);
          
        }
      }

      return (
        <div className="papa">
          
          <form onSubmit={handleSubmit} className="form">
            <h2>Add ticket</h2>
            <div>
              <label>Title</label>
              <input type="text" name="title" value={title} onChange={handleTitleChange} />
              {formErrors.title && (<div style={{ color: "red" }}>{formErrors.title}</div>)}
            </div>
            <div>
              <label>Priority</label>
              <select name="priority" value={priority} onChange={handlePriorityChange}>
                <option value={1}>Low</option>
                <option value={2}>Medium</option>
                <option value={3}>High</option>
              </select>
            </div>
            <div>
              
              <label>Description</label>
              <textarea className="textarea" name="description" value={description} cols="35" rows="10"  onChange={handleDescriptionChange} maxLength="30"/>
              {formErrors.description && (<div style={{ color: "green" }}>{formErrors.description}</div>)}

            </div>
            <button type="submit">Enviar</button>
          </form>
        </div>
      );
    }
    export default Formulario;