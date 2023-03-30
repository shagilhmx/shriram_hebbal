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
  document.querySelectorAll(".otpInput").forEach((e) => {
    checkNumber(e);
  });
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
    let otpForm = document.querySelectorAll(".inutContainer input");
    checkInputs([...otpForm], document.getElementById("otpBbutton1"));
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

    let otpForm = document.querySelectorAll(".inutContainer input");
    checkInputs([...otpForm], document.getElementById("otpBbutton1"));
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
    }, 10000),
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

let responseData;
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
    const check =
      utm_campaign || utm_source || utm_content || utm_medium || utm_terms;
    let body = {
      phone:
        document.getElementById("phoneNumber")?.value ||
        document.getElementById("phone")?.value,
      name:
        document.getElementById("Name")?.value ||
        document.getElementById("name")?.value,
      projectId: 22,
      ...(utm_campaign != null && { campaignCode: utm_campaign }),
      requireOtp: true,
      email:
        document.getElementById("Email")?.value ||
        document.getElementById("email")?.value,
      ...(check && {
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
        document.getElementById("enquirySubMain").style.display = "none";
        document.getElementById("otpVerification").style.display = "flex";
        let len =
          document.querySelector("#phoneNumber")?.parentElement.innerText
            ?.length;
        document.getElementById("enquirySubMain").style.display = "none";
        document.getElementById("otpVerification").style.display = "flex";
        document.querySelector("#numberText").innerHTML =
          document.querySelector("#numberText").innerText +
          `<strong> ${document
            .querySelector("#phoneNumber")
            ?.parentElement.innerText?.substring(0, len)}-${
            document.getElementById("phoneNumber")?.value
          }</strong>`;
        responseData = res;
      })
      .catch((err) => {
        document.getElementById("error").style.display = "block";
        document.getElementById("error").innerHTML = err?.message;
        document.getElementById("error").style.fontSize = "12px";
        document.getElementById("error").style.color = "red";
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
        animation.pause();
        animation1.pause();
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

function clickEvent(first, last) {
  if (first.value.length) {
    document.getElementById(last).focus();
  }
}

function moveFocusBack(e) {
  var prevInput = e.target.previousElementSibling;
  if (e.key === "Backspace" && e.target.value === "" && prevInput != null) {
    prevInput.focus();
  }
}

const optionLocation = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
};

function detectLocation(e) {
  let em = document.querySelector(
    `.${document.querySelector("#locationButton").children[1].className}`,
  );

  em.remove();
  document.getElementById("loading").style.display = "block";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        document.getElementById("detectText").innerText = "Location Fetched";
        document.getElementById("loading").style.display = "none";
        document.getElementById("locationButton").style.pointerEvents = "none";

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      },
      (error) => {
        // There was an error retrieving the location
        document.getElementById("detectText").innerText =
          "Failed to fetch Location!";
        document.getElementById("loading").style.display = "none";
        console.error(error);
      },
      optionLocation,
    );
  } else {
    console.log("geo-location not supported on your browser!");
    document.getElementById("loading").style.display = "none";
    document.getElementById("detectText").innerText =
      "Failed to fetch Location!";
  }
}

function backMain(e) {
  e.stopPropagation();

  document.getElementById("otpVerification").style.display = "none";
  document.getElementById("enquirySubMain").style.display = "flex";
  document.querySelector("#numberText").innerHTML =
    "Please Enter the Verification Code sent to";
}

function resendOtp(e) {
  e.stopPropagation();
  axios
    .post(
      `https://api-dcrm.fincity.com/open/opportunity/send-otp?token=${responseData?.token}`,
    )
    .then((res) => {
      document.querySelector("#resendOtp").innerText = "OTP SENT!";
      responseData = res;
    })
    .catch((err) => {});
}

function verfiyOtp(e) {
  e.stopPropagation();
  delete responseData?.locationDto;
  axios
    .post(`https://api-dcrm.fincity.com/open/opportunity/verify`, responseData)
    .then((res) => {
      document.getElementById("otpVerification").style.display = "none";
      document.getElementById("location").style.display = "flex";
    })
    .catch((err) => {});
}
