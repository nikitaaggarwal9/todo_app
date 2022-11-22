let categoryTags = document.querySelectorAll(".t-cat");
// console.log(categoryTags);
categoryTags.forEach(categoryTag => {
    let category = categoryTag.innerHTML.trim();
    console.log(category);
    let color = 'mustard';
    
    if (category == 'WORK') {
        color = 'orange';
    } else if (category == 'HOME') {
        color = 'green';
    } else if (category == 'PERSONAL') {
        color = 'pink';
    }

    categoryTag.style.backgroundColor = color;
})
