const text_processor = MML.getInstance();

function addDivToSections(html_string){
  console.log(html_string);
  
  const parser = new DOMParser();
  let doc = parser.parseFromString(html_string, 'text/html');
  
  const sections = doc.querySelectorAll('section');

  sections.forEach(section => {
    const h1 = section.querySelector('h1');
    h1.classList.add("merriweather-bold");

    // Create a new div to wrap remaining contents
    const contentDiv = document.createElement('div');
    contentDiv.className = 'content';
    contentDiv.classList.add("lato-regular");

    // Move all nodes after the h1 into the new div
    while (h1.nextSibling) {
      contentDiv.appendChild(h1.nextSibling);
    }

    // Append the new div to the section
    section.appendChild(contentDiv);
  });

  return doc.documentElement.innerHTML;
  
}

fetch('articles/article.mml')
  .then(_ => _.text())
  .then(_ => text_processor.processText(_))
  .then(_ => addDivToSections(_))
  .then(_ => document.getElementById('main').innerHTML = _);
// .then(_ => console.log(_))
// .then(_ => console.log(_.documentElement.innerHTML))
// .then(_ => fillOutline(text_processor.processText(_));

