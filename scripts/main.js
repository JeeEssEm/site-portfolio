class Story {

    constructor(image, text, theme, align, miniStories, id) {
        this.image = image
        this.text = text
        this.theme = theme
        this.isRight = align
        this.miniStories = miniStories
        this.id = id
    }

    render() {
        let result = "";

        if (this.isRight) {
            result = `
        <div class="row glass-board p-3 mt-5 rounded" id="glass_${this.id}">
            <div class="col-4 d-flex align-items-center justify-content-center">
                <img src="../static/images/${this.image}" alt="" class="rounded" style="border: 4px solid #4871CB; width: 100%; height: auto">
            </div>

            <div class="col-8 p-text">
                <strong>${this.theme}</strong>
                <p>${this.text}</p>
            </div>
        
        `;
        }
        else {
            result = `
        <div class="row glass-board p-3 mt-5 rounded" id="glass_${this.id}">
            <div class="col-8 p-text">
                <strong>${this.theme}</strong>
                <p>${this.text}</p>
            </div>
            
            <div class="col-4 d-flex align-items-center justify-content-center">
                <img src="../static/images/${this.image}" alt="" class="rounded" style="border: 4px solid #4871CB; width: 100%; height: auto">
            </div>
        `
        }

        if (this.miniStories.length > 0) {
            result += `
            <div class="col-12 d-flex justify-content-center">
                <button onclick="dropdown_list('${this.id}')" class="drop-button">
                    <span class="arrow" id="arrow_${this.id}"></span>
                </button>
            </div>
            `
        }

        result += "</div></div>"
        return result;
    }

    renderMiniStories() {
        if (this.miniStories.length === 0)
            return "";

        let result = `<ul class=\"container col-12 dropdown-items mb-5 p-5\" id=\"mini_story_${this.id}\" style=\"height: 0\">`;
        for(let i = 0; i < this.miniStories.length; i++) {
            let st = this.miniStories[i];
            result += `
            <li class="row glass-board p-3 mt-5 rounded">

                <div class="col-4 d-flex align-items-center justify-content-center">
                    <img src="../static/images/${st.img}" alt="" class="rounded" style="border: 4px solid #4871CB; width: 100%; height: auto">
                </div>

                <div class="col-8 p-text">
                    <strong>${st.theme}</strong>
                    <p>${st.text}</p>
                </div>
                
            </li>
            `
        }

        result += "</ul>";

        return result;
    }
}


function build_stories() {
    let result = '';

    for(let i = 0; i < PersonalStories.length; i++) {
        let st = PersonalStories[i];
        let miniStories = {};
        if (st.miniStories) {
            miniStories = st.miniStories
        }
        let obj = new Story(st.img, st.text, st.theme, i % 2 === 0, miniStories, i);
        result += obj.render() + obj.renderMiniStories();
    }
    return result;
}


function dropdown_list(id) {
    let element = document.getElementById(`mini_story_${id}`);
    let arrow = document.getElementById(`arrow_${id}`);

    if (element.style.height === "0px")
    {
        element.style.paddingTop = "2rem"
        element.style.paddingBottom = "0.5rem"
        element.style.height = "auto"
        arrow.style.rotate = "180deg"
    }

    else {
        arrow.style.rotate = "0deg"
        element.style.paddingTop = "0"
        element.style.paddingBottom = "0"
        element.style.height = "0"
    }
}


const PersonalStories = [


    {
        img: '2course.jpg',
        text: 'На первом курсе Яндекс Лицея меня обучили основам языка python: синтаксис, различные встроенные функции, ООП, а также работе с файловой системой при помощи встроенных средств и разных библиотек для работы с excel файлами.',
        theme: 'Лицей академии Яндекса. 1 год'
    },

    {
        img: 'cert.jpg',
        text: 'На втором курсе я реализовывал полноэкранные приложения в команде с использованием различных фреймворков, также нас познакомили с работой api и REST api, и отдельно разобрали взаимодействие с яндекс картами. Для разработки некоторых проектов мне нужно было самостоятельно разобраться в функционале библиотек для работы с компьютерными сетями. Также нас познакомили со средой github и способами взаимодейстия с ней через IDE.',
        theme: 'Лицей академии Яндекса. 2 год',
        miniStories: [
            {
                img: 'messenger.png',
                text: "Данный проект - это мессенджер, написанный на языке python, фреймворк PyQt5. Для обеспечения взаимодействия между устройствами мной был использован клиент-серверный вариант с применением библиотеки socket. Для цветового оформления интерфейса использовался css.",
                theme: 'Первый проект. <a class="link" href="https://github.com/JeeEssEm/messenger-pyqt5">Мессенджер</a>'
            },

            {
                img: 'pymogus.png',
                text: "Данный проект - это реплика популярной игры among us. Мы написали его на языке python, фреймворк pygame. Для поддержки сетевой игры мы использовали клиент-серверный вариант с использованием библиотеки socket.",
                theme: 'Второй проект. <a class="link" href="https://github.com/ilya159368/PygameAmongUs">Pymogus</a>'
            },

            {
                img: 'practicehub.png',
                text: 'Данный проект - попытка создания сайта с курсами для школы, на котором можно создать курс, записаться и пройти. На стороне frontend мы использовали html, css, и javascript, в частности JQuery. На стороне backend мы использовали язык python, фреймворк Flask и SQLAlchemy для установки ORM связи с базой данных sqlite.',
                theme: 'Третий проект. <a class="link" href="https://github.com/ilya159368/PracticeHub">PracticeHub</a>'
            }
        ]
    },

	{
        img: 'dreamteam.jpg',
        text: 'После опыта с Лицеем академии Яндекса, я понял, что направление IT мне интересно, поэтому поступил в IT класс в своей школе. Здесь нас обучают основам ИИ и работе с большими данными, а также алгоритмам и структурам данных в рамках языка C++. На фото я и мои друзья из Яндекс лицея, мы работали в команде, поэтому вместе решили поступить в IT класс.',
        theme: 'IT класс (настоящее время)'
    }
];

const container = document.getElementById("stories_container");
container.innerHTML += build_stories();
