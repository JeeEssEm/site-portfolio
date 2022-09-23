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
        <div class="row glass-board p-3 mt-5 rounded">
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
        <div class="row glass-board p-3 mt-5 rounded">
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
                <button onclick="dropdown_list(${this.id})" style="background: transparent; border: none">
                    <span class="arrow"></span>
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

        let result = `<ul class=\"container col-8 dropdown-items\" id=\"${this.id}\" style=\"display: none\">`;
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
    let element = document.getElementById(id);

    if (element.style.display === "none")
        element.style.display = "";

    else
        element.style.display = "none";
}


const PersonalStories = [
    {
        img: 'maxonchick.jpg',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        theme: 'Theme name'
    },

    {
        img: 'maxonchick.jpg',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        theme: 'Theme name',
        miniStories: [
            {
                img: 'logo.png',
                text: "some cool story",
                theme: "story"
            },

            {
                img: 'logo.png',
                text: "some cool story",
                theme: "story"
            }
        ]
    }

];

const container = document.getElementById("stories_container");
container.innerHTML += build_stories();