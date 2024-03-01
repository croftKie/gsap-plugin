const createCodeButton = document.getElementById("create-code");
const codeEl = document.getElementById("code");
const actionsList = document.getElementById("actions-list");
const durationList = document.getElementById("duration-list");
const easingList = document.getElementById("easing-list");
import {ACTIONS, DURATION, EASING, creation} from "./options.js";

actionsList.innerHTML = `<h3>Background Actions:</h3>
    <div class="actions-items">
        ${Object.values(ACTIONS.background).map((item, index)=>{
            return `<div class="action-item">
                <input class="${item}-check" type="checkbox" />
                <p>${item}</p>
                <input class="${item}-value" placeholder="value" type="text" />
            </div>`
        }).join("")}
</div>`;

durationList.innerHTML = `<h3>Duration Adjustment:</h3>
<div class="actions-items">
    ${Object.keys(DURATION).map((item, index)=>{
        return `<div class="action-item">
            <p>${item}</p>
            <input class="${item}-value" placeholder="value" type="text" />
        </div>`
    }).join("")}
</div>`;

easingList.innerHTML = `<h3>Easing Adjustment:</h3>
<div class="actions-items">
    ${Object.values(EASING.power1).map((item, index)=>{
        return `<div class="action-item">
            <p>${item}</p>
            <input class="${item.replaceAll(".", "-")}-value" placeholder="value" type="checkbox" />
        </div>`
    }).join("")}
</div>`;

Object.values(ACTIONS.background).forEach((item)=>{
    document.querySelector(`.${item}-check`).addEventListener("click", (e)=>{
        const value = document.querySelector(`.${item}-value`);
        if (value.value === ""){
            console.log("no value given");
        } else {
            creation.actions.push({[item]: value.value})
            console.log(creation);
        }
    })
});

Object.keys(DURATION).forEach((item)=>{
    document.querySelector(`.${item}-value`).addEventListener("change", ()=>{
        const value = document.querySelector(`.${item}-value`).value;

        if (value === ""){
            creation.duration = 0.5;
            console.log(creation);
        } else {
            creation.duration = parseFloat(value);
            console.log(creation);
        }
    })
})

Object.values(EASING.power1).forEach((item)=>{
    console.log(item);
    document.querySelector(`.${item.replaceAll(".", "-")}-value`).addEventListener("change", ()=>{
        const value = document.querySelector(`.${item.replaceAll(".", "-")}-value`).value;

        if (value === false){
            creation.easing = "";
            console.log(creation);
        } else {
            creation.easing = item;
            console.log(creation);
        }
    })
})

createCodeButton.addEventListener("click", ()=>{
    creation.code = `gsap.to(TARGET, {${creation.actions.map((item)=>{
            return `${Object.keys(item)[0]}: "${Object.values(item)[0]}"`
        }).join(",")}, duration: ${creation.duration}, ease: '${creation.easing}'});`;
    creation.execute = (e) => {
        gsap.to(e.target, {
            ...creation.actions[0],
            duration: creation.duration,
            ease: `${creation.easing}`,
        });
    }

    codeEl.innerText = creation.code;

    document.getElementById("previewElement").addEventListener("mouseenter", (e)=>{
        creation.execute(e);
    });
})
