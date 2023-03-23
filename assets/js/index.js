window.onload = function () {
  let input = document.getElementById("phoneNumber");
  window.intlTelInput(input, {
    separateDialCode: true,
    initialCountry: "IN",
    onlyCountries: [
      "AU",
      "BT",
      "BR",
      "CA",
      "CN",
      "DE",
      "HK",
      "IN",
      "IT",
      "JP",
      "KW",
      "MY",
      "MV",
      "NP",
      "QA",
      "SA",
      "SG",
      "LK",
      "TH",
      "AE",
    ],
  });

  let input2 = document.getElementById("phone");
  window.intlTelInput(input2, {
    separateDialCode: true,
    initialCountry: "IN",
    onlyCountries: [
      "AU",
      "BT",
      "BR",
      "CA",
      "CN",
      "DE",
      "HK",
      "IN",
      "IT",
      "JP",
      "KW",
      "MY",
      "MV",
      "NP",
      "QA",
      "SA",
      "SG",
      "LK",
      "TH",
      "AE",
    ],
  });
  checkNumber(document.getElementById("phoneNumber"));
  checkNumber(document.getElementById("phone"));
};

function checkNumber(item) {
  item.addEventListener("input", () => {
    const inputValue = item.value;
    const numericValue = inputValue.replace(/[^0-9]/g, ""); // remove all non-numeric characters
    item.value = numericValue;
  });
}

function excute(data) {
  return;
}

function readMore() {
  document.getElementById("displayMore").style.display = "block";
  document.getElementById("read").style.display = "none";
  document.getElementById("readLess2").style.display = "block";
}

function readMoretwo() {
  document.getElementById("displayMoreTwo").style.display = "inline";
  document.getElementById("readTwo").style.display = "none";
  document.getElementById("readLess1").style.display = "inline";
}

function readLess() {
  document.getElementById("displayMoreTwo").style.display = "none";
  document.getElementById("readTwo").style.display = "block";
  document.getElementById("readLess1").style.display = "none";
}

function readLess2() {
  document.getElementById("displayMore").style.display = "none";
  document.getElementById("read").style.display = "block";
  document.getElementById("readLess2").style.display = "none";
}

function checkInputs(inputs, submitButton) {
  const anyEmpty = inputs.some((input) => input.value.trim() === "");
  submitButton.disabled = anyEmpty;
}

window.addEventListener(
  "load",
  (event) => {
    let form = document.querySelectorAll(
      ".enquirySubMain input:not(input[type='checkbox'])",
    );
    checkInputs(
      [...form].splice(0, 3),
      document.getElementById("enquirBbutton1"),
    );
    checkInputs([...form].splice(3), document.getElementById("enquirBbutton2"));
  },
  false,
);

window.addEventListener(
  "input",
  (event) => {
    let form = document.querySelectorAll(
      ".enquirySubMain input:not(input[type='checkbox'])",
    );
    checkInputs(
      [...form].splice(0, 3),
      document.getElementById("enquirBbutton1"),
    );
    checkInputs([...form].splice(3), document.getElementById("enquirBbutton2"));
  },
  false,
);

window.addEventListener(
  "load",
  (event) => {
    $(".clicker").click(function () {
      if ($(this).hasClass("open")) {
        $(this).removeClass("open");
        $(this).find(".containerDivMain").slideUp(400);
      } else {
        $(".clicker").find(".containerDivMain").slideUp(400);
        $(".clicker").removeClass("open");
        $(this).addClass("open");
        $(this).find(".containerDivMain").slideDown(400);
      }
    });
  },
  false,
);

window.addEventListener(
  "load",
  (event) =>
    setTimeout(() => {
      document.getElementById("modal").style.display = "block";
      let blur = document.querySelectorAll("body > *:not(#modal");
      blur.forEach((blurElem) => {
        blurElem.style.filter = "blur(5px)";
        blurElem.style.pointerEvents = "none";
      });
    }, 1000),
  false,
);

function closeModal() {
  document.getElementById("modal").style.display = "none";
  let blur = document.querySelectorAll("body > *:not(#modal");
  blur.forEach((blurElem) => {
    blurElem.style.filter = "blur(0px)";
    blurElem.style.pointerEvents = "all";
  });
}

function openApi(event) {
  event.stopPropagation();
  let emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (
    (document.getElementById("Email")?.value?.match(emailRegex) ||
      document.getElementById("email")?.value?.match(emailRegex)) &&
    (document.getElementById("Name")?.value ||
      document.getElementById("name")?.value) &&
    (document.getElementById("phoneNumber")?.value ||
      document.getElementById("phone")?.value)
  ) {
    let url = window.location.href;
    let searchParams = new URLSearchParams(new URL(url).search);

    utm_source = searchParams.get("utm_source");
    utm_campaign = searchParams.get("utm_campaign");
    utm_medium = searchParams.get("utm_medium");
    utm_content = searchParams.get("utm_content");
    utm_terms = searchParams.get("utm_terms");

    let body = {
      phone:
        document.getElementById("phoneNumber")?.value ||
        document.getElementById("phone")?.value,
      name:
        document.getElementById("Name")?.value ||
        document.getElementById("name")?.value,
      propjectId: 22,
      ...(utm_campaign != null && { campaignCode: utm_campaign }),
      email:
        document.getElementById("Email")?.value ||
        document.getElementById("email")?.value,
      ...(searchParams?.entries?.length > 0 && {
        metadata: {
          utm_campaign: utm_campaign,
          utm_content: utm_content,
          utm_medium: utm_medium,
          utm_source: utm_source,
          utm_terms: utm_terms,
        },
      }),
    };

    axios
      .post("https://api-dcrm.fincity.com/open/opportunity", body)
      .then((res) => {
        console.log("success", res);
        window.location.href = "/thankyou.html";
      })
      .catch((err) => {
        document.getElementById("error").style.display = "block";
        document.getElementById("error").innerHTML = err?.message;
        document.getElementById("error").style.fontSize = "12px";
        document.getElementById("error").style.color = "red";
        console.log(err);
      });
  }
}

const options = {
  useEasing: true,
  useGrouping: true,
  separator: ",",
  decimal: ".",
  decimalPlaces: 1,
};

options1 = {
  useEasing: true,
  useGrouping: true,
  separator: ",",
  useIndianSeparators: true,
};

function animateValue(id, end, round) {
  const counter = new countUp.CountUp(id, end, round ? options : options1);
  counter.start();
}

var animation, animation1;
window.addEventListener(
  "load",
  (event) => {
    observer.observe(document.querySelector(".section4"));
    observer.observe(document.querySelector(".section2"));
    observer.observe(document.querySelector(".section2Mobile"));
    animation = lottie.loadAnimation({
      container: document.getElementById("outer"),
      renderer: "svg",
      loop: false,
      speed: 1.0,
      autoplay: true,
      path: "assets/images/lottie1.json",
    });
    animation1 = lottie.loadAnimation({
      container: document.getElementById("outer1"),
      renderer: "svg",
      loop: false,
      speed: 1.0,
      autoplay: true,
      path: "assets/images/lottie1Mobile.json",
    });
  },
  false,
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry?.isIntersecting) {
        load();
        animation.play();
        animation1.play();
      } else {
        animation.stop();
        animation1.stop();
        return;
      }
    });
  },
  { threshold: 0.75 },
);

function load() {
  animateValue("count1", 1.8, true);
  animateValue("count2", 511, false);
  animateValue("count3", 267273, false);
  animateValue("count4", 1.8, true);
  animateValue("count5", 511, false);
  animateValue("count6", 267273, false);
}
