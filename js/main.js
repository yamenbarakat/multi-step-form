// save data chosen by user
const data = {
  plan: {},
};

// global elements
const container = document.getElementById("container");
const steps = document.querySelectorAll(".steps li");
const mobileButtons = document.querySelector(".buttons-mobile");

// track active steps
let activeStep = 0;

// global helper functions
function removeEvent(step) {}

// remove class active from current step and add it to the next step
function activeNext() {
  steps[activeStep].classList.remove("active");
  activeStep++;
  steps[activeStep].classList.add("active");
}

// remove class active from current step and add it to the previous step
function activeBack() {
  steps[activeStep].classList.remove("active");
  activeStep--;
  steps[activeStep].classList.add("active");
}

/********** start step one **********/

// start with step one
stepOne();

function stepOne() {
  // render step one elements
  container.innerHTML = `          
        <h1>Personal info</h1>
        <p>Please provide your name, email address, and phone number.</p>
        <form action="">
            <div class="input">
                <div class="error name-msg"></div>
                <label for="name">Name</label>
                <input id="name" type="text" placeholder="e.g. Stephen King" />
            </div>
            <div class="input">
                <div class="error email-msg"></div>
                <label for="email">Email Address</label>
                <input
                    id="email"
                    type="email"
                    placeholder="e.g. stephenking@lorem.com"
                />
            </div>
            <div class="input">
                <div class="error phone-msg"></div>
                <label for="phone">Phone Number</label>
                <input id="phone" type="tel" placeholder="e.g. +1 234 567 890" />
            </div>
            <div class="buttons-desktop buttons step-one">
                <button class="back">Go Back</button>
                <button class="next">Next Step</button>
            </div>
        </form>`;

  mobileButtons.innerHTML = `      
          <button class="back">Go Back</button>
          <button class="next">Next Step</button>`;

  // add class active to step one
  steps[activeStep].classList.add("active");

  // input elements
  const inputs = document.querySelectorAll(".input input");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");

  // erorr msgs
  const msgs = document.querySelectorAll(".error");
  const emailMsg = document.querySelector(".email-msg");
  const phoneMsg = document.querySelector(".phone-msg");
  const submit = document.querySelectorAll(".buttons .next");

  // if there is data in storage, display them
  if (sessionStorage.getItem("name")) {
    nameInput.value = sessionStorage.getItem("name");
    emailInput.value = sessionStorage.getItem("email");
    phoneInput.value = sessionStorage.getItem("phone");
  }

  // validation state
  let state;

  // attach click event for each submit button
  submit.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      // initial value
      state = false;

      // check if any input is empty
      if (checkEmpty()) {
        // stop the function here
        return;
      }

      // validate email
      validateEmail();

      // validate phone number
      validatePhone();

      // if the validation failed stop the function
      if (state) {
        return;
      }

      // save name data
      data.name = nameInput.value;

      // save email data
      data.email = emailInput.value;

      // save phone data
      data.phone = phoneInput.value;

      // save values in session storage
      sessionStorage.setItem("name", nameInput.value);
      sessionStorage.setItem("email", emailInput.value);
      sessionStorage.setItem("phone", phoneInput.value);

      // remove class active form current step and add it to next step
      activeNext();

      // run step two
      stepTwo();
    });
  });

  // check if any input is empty
  function checkEmpty() {
    inputs.forEach((input, num) => {
      if (input.value === "") {
        state = true;
        input.classList.add("required");
        msgs[num].textContent = "This field is required";
        state = true;
      }

      return state;
    });
  }

  // validate email
  function validateEmail() {
    const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // if it is not valid show error msg
    if (!validRegex.test(emailInput.value)) {
      emailMsg.textContent = "invalid email address";
      emailInput.classList.add("required");
      state = true;
    }
  }

  function validatePhone() {
    // validate phone number
    const validRegex = /^\+\d{10}$/;

    // if it is not valid show error msg
    if (!phoneInput.value.match(validRegex)) {
      phoneMsg.textContent = "invalid phone number";
      phoneInput.classList.add("required");
      state = true;
    }
  }

  // hide error msg and remove class required on typing
  inputs.forEach((input, num) => {
    input.addEventListener("keyup", () => {
      msgs[num].textContent = "";
      input.classList.remove("required");
    });
  });
}

/********** end step one **********/

/********** start step two **********/

function stepTwo() {
  // render step two elements
  container.innerHTML = `          
    <h1>Select your plan</h1>
    <p>You have the option of monthly or yearly billing.</p>
    <div class="plans">
      <div
        class="plan chosen"
        data-name="arcade"
        data-time="monthly"
        data-price="9"
      >
        <img src="assets/images/icon-arcade.svg" alt="" />
        <div class="desc">
          <h3>Arcade</h3>
          <span class="price">$9/mo</span>
          <span class="free-offer">2 months free</span>
        </div>
      </div>
      <div
        class="plan"
        data-name="advanced"
        data-time="monthly"
        data-price="12"
      >
        <img src="assets/images/icon-advanced.svg" alt="" />
        <div class="desc">
          <h3>Advanced</h3>
          <span class="price">$12/mo</span>
          <span class="free-offer">2 months free</span>
        </div>
      </div>
      <div
        class="plan"
        data-name="pro"
        data-time="monthly"
        data-price="15"
      >
        <img src="assets/images/icon-pro.svg" alt="" />
        <div class="desc">
          <h3>Pro</h3>
          <span class="price">$15/mo</span>
          <span class="free-offer">2 months free</span>
        </div>
      </div>
    </div>

    <div class="time-plan">
      <span class="monthly chosen">Monthly</span>
      <div class="indecator mo">
        <span></span>
      </div>
      <span class="yearly">Yearly</span>
    </div>

    <div class="buttons-desktop buttons step-two">
      <button class="back">Go Back</button>
      <button class="next">Next Step</button>
    </div>`;

  mobileButtons.innerHTML = `      
    <button class="back">Go Back</button>
    <button class="next">Next Step</button>`;

  // remvoe step one class and add step two class
  mobileButtons.classList.remove("step-one");
  mobileButtons.classList.add("step-two");

  // get needed elements
  const plans = document.querySelectorAll(".plans .plan");
  const prices = document.querySelectorAll(".plans .price");
  const freeOffer = document.querySelectorAll(".plans .free-offer");
  const indecator = document.querySelector(".time-plan .indecator");
  const monthly = document.querySelector(".time-plan .monthly");
  const yearly = document.querySelector(".time-plan .yearly");
  const goBack = document.querySelectorAll(".buttons .back");
  const submit = document.querySelectorAll(".buttons .next");

  // check if any saved data in storage to show
  const planName = sessionStorage.getItem("planName");
  if (planName) {
    plans.forEach((plan) => {
      plan.classList.remove("chosen");
    });

    document.querySelector(`[data-name="${planName}"]`).classList.add("chosen");

    const planTime = sessionStorage.getItem("planTime");

    // change indecator direction and set chosen class to plan time
    if (planTime === "monthly") {
      indecator.classList.add("mo");
      indecator.classList.remove("yr");

      monthly.classList.add("chosen");
      yearly.classList.remove("chosen");
      updateInfo();
    } else {
      indecator.classList.add("yr");
      indecator.classList.remove("mo");

      monthly.classList.remove("chosen");
      yearly.classList.add("chosen");
      updateInfo();
    }
  }

  // choose paln on click
  plans.forEach((plan) => {
    plan.addEventListener("click", () => {
      // remove chosen class and add it to the chosen one
      plans.forEach((plan) => {
        plan.classList.remove("chosen");
      });

      plan.classList.add("chosen");
    });
  });

  // change time plan data on click
  indecator.addEventListener("click", () => {
    // change the indecator direction and style the chosen time plan
    changeDirection();
    chosenTime();

    // update plans info based on time choosing
    updateInfo();
  });

  // change the indecator direction
  function changeDirection() {
    if (indecator.classList.contains("mo")) {
      indecator.classList.remove("mo");
      indecator.classList.add("yr");
    } else {
      indecator.classList.add("mo");
      indecator.classList.remove("yr");
    }
  }

  // style the chosen time plan
  function chosenTime() {
    if (indecator.classList.contains("mo")) {
      monthly.classList.add("chosen");
      yearly.classList.remove("chosen");
    } else {
      monthly.classList.remove("chosen");
      yearly.classList.add("chosen");
    }
  }

  function updateInfo() {
    if (yearly.classList.contains("chosen")) {
      // update data set info
      updateHelper(
        "yearly",
        ["90", "120", "150"],
        ["$90/yr", "$120/yr", "$150/yr"]
      );

      // show free offer
      freeOffer.forEach((offer) => {
        offer.classList.add("show");
      });
    } else {
      updateHelper("monthly", ["9", "12", "15"], ["$9/mo", "$12/mo", "$15/mo"]);

      // hide free offer
      freeOffer.forEach((offer) => {
        offer.classList.remove("show");
      });
    }
  }

  // update helper
  function updateHelper(time, pricesData, pricesDisplayed) {
    plans.forEach((plan) => {
      plan.dataset.time = time;
    });

    pricesData.forEach((price, num) => {
      plans[num].dataset.price = price;
    });

    pricesDisplayed.forEach((price, num) => {
      prices[num].textContent = price;
    });
  }

  // go back to the previous step on click
  goBack.forEach((button) => {
    button.addEventListener("click", () => {
      // save chosen data
      saveData();

      // remove class active from current step and add it to the previous step
      activeBack();
      // remvoe step two class and add step one class
      mobileButtons.classList.remove("step-two");
      mobileButtons.classList.add("step-one");

      stepOne();
    });
  });

  // save chosen data and go to the next step
  submit.forEach((button) => {
    button.addEventListener("click", () => {
      // save chosen data
      saveData();

      // remove class active form current step and add it to next step
      activeNext();

      // go to the next step
      stepThree();
    });
  });

  // save chosen data
  function saveData() {
    const chosenPlan = document.querySelector(".plans .chosen");
    data.plan.name = chosenPlan.dataset.name;
    data.plan.time = chosenPlan.dataset.time;
    data.plan.price = chosenPlan.dataset.price;

    // save chosen data in storage
    sessionStorage.setItem("planName", data.plan.name);
    sessionStorage.setItem("planTime", data.plan.time);
  }
}

/********** end step two **********/

/********** start step three **********/

function stepThree() {
  container.innerHTML = `          
    <h1>Pick add-ons</h1>
    <p>Add-ons help enhance your gaming experience.</p>
    <div class="offer chosen" data-name="Online service">
      <input type="checkbox" checked>
      <div class="text">  
        <h3>Online service</h3>
        <span class="desc">Access to multiplayer games</span> 
      </div>
      <div class="price"></div>
    </div>
    <div class="offer chosen" data-name="Larger storage">
      <input type="checkbox" checked>
      <div class="text">  
        <h3>Larger storage</h3>
        <span class="desc">Extra 1TB of cloud save</span> 
      </div>
      <div class="price"></div>
    </div>
    <div class="offer" data-name="Customizable Profile">
      <input type="checkbox">
      <div class="text">  
        <h3>Customizable Profile</h3>
        <span class="desc">Custom theme on your profile</span> 
      </div>
      <div class="price"></div>
    </div>

    <div class="buttons-desktop buttons step-two">
      <button class="back">Go Back</button>
      <button class="next">Next Step</button>
    </div>
    `;

  mobileButtons.innerHTML = `      
    <button class="back">Go Back</button>
    <button class="next">Next Step</button>`;

  // get needed elements
  const offers = document.querySelectorAll(".offer");
  const prices = document.querySelectorAll(".offer .price");
  const goBack = document.querySelectorAll(".buttons .back");
  const submit = document.querySelectorAll(".buttons .next");

  // check if any saved data in storage to show
  const offerName = sessionStorage.getItem("offerName");

  if (offerName) {
    // remove default chosen offer
    offers.forEach((offer) => {
      offer.classList.remove("chosen");
      offer.firstElementChild.removeAttribute("checked");
    });

    // add chosen to the saved offer data
    const savedData = JSON.parse(offerName);

    savedData.forEach((offerName) => {
      const offer = document.querySelector(`[data-name='${offerName}']`);
      offer.classList.add("chosen");
      offer.firstElementChild.setAttribute("checked", "checked");
    });
  }

  // set the prices based on the choosed time plan
  if (data.plan.time === "monthly") {
    // save prices in dataset
    savePrices([1, 2, 2]);

    // set prices to elements
    setPrices("mo", [1, 2, 2]);
  } else {
    // save prices in dataset
    savePrices([10, 20, 20]);

    // set prices to elements
    setPrices("yr", [10, 20, 20]);
  }

  // save prices in dataset
  function savePrices(prices) {
    offers.forEach((offer, index) => {
      offer.dataset.price = prices[index];
    });
  }

  // set prices to elements
  function setPrices(time, values) {
    prices.forEach((price, index) => {
      price.textContent = `+$${values[index]}/${time}`;
    });
  }

  // choose offer on click
  offers.forEach((offer) => {
    offer.addEventListener("click", () => {
      offer.classList.toggle("chosen");
      if (offer.firstElementChild.hasAttribute("checked")) {
        offer.firstElementChild.removeAttribute("checked");
      } else {
        offer.firstElementChild.setAttribute("checked", "checked");
      }
    });
  });

  // go back to the previous step on click
  goBack.forEach((button) => {
    button.addEventListener("click", () => {
      // remove class active from current step and add it to the previous step
      activeBack();

      // save chosen data
      saveData();

      stepTwo();
    });
  });

  // save chosen data and go to the next step
  submit.forEach((button) => {
    button.addEventListener("click", () => {
      // save chosen data
      saveData();

      // remove class active form current step and add it to next step
      activeNext();

      // go to the last step
      finishUp();
    });
  });

  // save chosen data
  function saveData() {
    // chosen data
    const chosenData = document.querySelectorAll(".chosen");

    data.offerName = [];
    data.offerPrice = [];

    chosenData.forEach((chosen) => {
      data.offerName.push(chosen.dataset.name);
      data.offerPrice.push(chosen.dataset.price);
    });

    // save data in storage
    const offerName = JSON.stringify(data.offerName);
    sessionStorage.setItem("offerName", offerName);
  }
}

/********** end step three **********/

/********** start step four **********/

function finishUp() {
  container.innerHTML = `          
    <h1>Finishing up</h1>
    <p>Double-check everything looks OK before confirming.</p>
    <div class="summary">
      <ul class="chosen-data">
        <li class="chosen-plan">
          <div>
            <h3><span class="plan-name"></span> (<span class="plan-time"></span>)</h3>
            <a class="change-plan">Change</a>
          </div>
          <span class="plan-price">+$1/mo</span>
        </li>
      </ul>
      <div class="total">
        <h3>Total (per <span class="per-time"></span>)</h3>
        <span class="total-price">+$1/mo</span>
      </div>
    </div>

    <div class="buttons-desktop buttons step-two">
      <button class="back">Go Back</button>
      <button class="next confirm">Confirm</button>
    </div>
    `;

  mobileButtons.innerHTML = `      
    <button class="back">Go Back</button>
    <button class="next confirm">Confirm</button>`;

  // get needed elements
  const chosenData = document.querySelector(".summary .chosen-data");
  const planName = document.querySelector(".summary .plan-name");
  const planTime = document.querySelector(".summary .plan-time");
  const planPrice = document.querySelector(".summary .plan-price");
  const perTime = document.querySelector(".summary .per-time");
  const totalPrice = document.querySelector(".summary .total-price");
  const changePlan = document.querySelector(".summary .change-plan");
  const goBack = document.querySelectorAll(".buttons .back");
  const confirm = document.querySelectorAll(".buttons .confirm");

  planName.textContent = data.plan.name;
  planTime.textContent = data.plan.time;

  // shorcut time plan
  const shorcutTime = data.plan.time === "monthly" ? "mo" : "yr";
  planPrice.textContent = `$${data.plan.price}/${shorcutTime}`;

  // display chosen offers if there is any
  if (data.offerName.length > 0) {
    const container = document.createElement("ul");
    container.className = "offers";

    data.offerName.forEach((offer, index) => {
      const li = document.createElement("li");
      const h3 = document.createElement("h3");
      const span = document.createElement("span");

      h3.textContent = offer;
      span.textContent = `$${data.offerPrice[index]}/${shorcutTime}`;

      li.append(h3, span);

      container.append(li);
    });

    chosenData.append(container);
  }

  // display the total price per time
  perTime.textContent = data.plan.time.slice(0, -2);

  const total =
    +data.plan.price + data.offerPrice.reduce((acc, num) => +acc + +num, 0);
  totalPrice.textContent = `$${total}/${shorcutTime}`;

  // back to step two to change plan on click
  changePlan.addEventListener("click", () => {
    // run active back twice
    activeBack();
    activeBack();

    // go to step two
    stepTwo();
  });

  // go back to the previous step on click
  goBack.forEach((button) => {
    button.addEventListener("click", () => {
      // remove class active from current step and add it to the previous step
      activeBack();

      stepThree();
    });
  });

  // confirm the application on click
  confirm.forEach((button) => {
    button.addEventListener("click", () => {
      confirmation();
    });
  });
}

/********** end step four **********/

function confirmation() {
  container.style.height = "100%";

  container.innerHTML = `
    <div class="confirmation">
      <img src="assets/images/icon-thank-you.svg" alt="" />
      <h1>Thank you!</h1>
      <p>confirming your subscription! We hope you have fun using
      our platform. If you ever need support, please feel free to email us at
      support@loremgaming.com.
      </p>
    </div>
    `;
}
