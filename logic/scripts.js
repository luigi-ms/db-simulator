const inputs = document.getElementsByTagName("input");

Array.from(inputs).forEach(i => {
  i.addEventListener("blur", e => {
    if(e.target.value === ""){
      e.target.classList.remove("notEmptyInput");
    }else{
      e.target.classList.add("notEmptyInput");
    }
  });
});
