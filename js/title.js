function getRequest(){
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://localhost:3000/", requestOptions)
    .then(response => response.text())
    .then(result => {

      const newElement = document.createElement("h1");

      newElement.innerHTML = result;

      const div = document.querySelector(".container");

      document.body.insertBefore(newElement, div);
    })
    .catch(error => console.log('error', error));
}

export {getRequest}