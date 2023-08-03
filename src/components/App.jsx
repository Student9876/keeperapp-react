import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Note from './Note';
import CreateArea from './CreateArea';
import axios from 'axios';


function App() {

    function reloadPage(){
        window.location.reload();
      }

    const [item, setItem] = useState({
        title: "",
        text: ""
    });
    const [items, setItems] = useState([]);


    React.useEffect(() => {
        axios.get('http://localhost:3001/').then(response => {
            console.log(response.data);
            setItems(response.data);
        })
            .catch(err => {
                console.log(err);
            })
    }, [])



    function addItems(event) {
        setItem(prevValue => {
            return {
                title: prevValue.title,
                text: prevValue.text
            }
        });
        axios
            .post('http://localhost:3001/add', item)
            .then(() => console.log('Item posted'))
            .catch(err => {
                console.error(err);
            });
        setItem({
            title: "",
            text: ""
        });
        event.preventDefault();
        reloadPage();
    }


    function handleChange(event) {
        const newValue = event.target.value;
        const newName = event.target.name;
        setItem(prevValue => {
            if (newName === 'title') return {
                title: newValue,
                text: prevValue.text
            }
            else if (newName === 'content') return {
                title: prevValue.title,
                text: newValue
            }
        });
    }

    function deleteItem(id) {
        axios.post("http://localhost:3001/delete", {id: id})
            .then(() => { console.log("Deleted successfully") })
            .catch(err => {
                console.log(err);
            });
            reloadPage();
    }


    return (
        <div>
            <Header />
            <CreateArea
                handleChange={handleChange}
                addItems={addItems}
                title={item.title}
                content={item.text}
            />
            {<div>
                {
                    items.map((note, index) => (

                        < Note
                            key={index}
                            id={items[index]._id}
                            title={note.title}
                            content={note.text}
                            deleteItem={deleteItem}
                        />
                    )
                    )
                }
            </div>}
            <Footer />
        </div>
    );
}

export default App;
