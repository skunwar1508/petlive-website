import { toast } from "react-toastify";
// import { reactLocalStorage } from "reactjs-localstorage";
import * as Yup from "yup";
// import apiFunc from "./api";
import millify from "millify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
const apiFunc = () => {}

const common = {
  confirm: (message, title, onConfirm) => {
    confirmAlert({
      title: title,
      message: message,
      buttons: [
        {
          label: "Yes",
          onClick: () => onConfirm()
        },
        {
          label: "No"
        }
      ]
    });
  },
  milifying: (milifyData) => {
    return millify(milifyData, {
      units: ["", "K", "M", "B", "T", "P", "E"],
      space: true,
    });
  },
  loader: (type) => {
    if (type) {
      document.body.className = "loading_page";
    } else {
      document.body.className = document.body.className.replace(
        "loading_page",
        ""
      );
    }
  },
  base64Mime: (encoded) => {
    var result = null;
    if (typeof encoded !== "string") {
      return result;
    }
    var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    if (mime && mime.length) {
      result = mime[1];
    }
    return result;
  },
  base64ReadFile: (base64String) => {
    var nonBlob = base64String == undefined ? 0 : base64String.length;
    var filetype = common.base64Mime(base64String);
    var datass = { size: nonBlob / 1000, type: filetype };
    return datass;
  },
  trim : (d)=>{
    if(d==undefined || d == null ||d==''){
      return
    }
    return d.replace( /(<([^>]+)>)/ig, '')
  },
  audioBase64: (blob) => {
    var reader = new window.FileReader();
    var base64;
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      base64 = reader.result;
      base64 = base64.split(",")[1];
    };
    return base64;
  },
  previewURL: (file) => {
    let URL = "";
    if (file != "") {
      URL = window.URL.createObjectURL(file);
    }
    return URL;
  },
  mineTypeValidate: (value) => {
    if (value == undefined || value == null) {
      return false;
    }
    let fileType = value.type;
    return (
      value &&
      (fileType === "image/jpeg" ||
        fileType === "image/bmp" ||
        fileType === "image/png") /* ||
      fileType === 'application/pdf' ||
      fileType === "application/msword" */
    );
  },
  fileSizeValidate: (value, size) => {
    if (value == undefined || value == null) {
      return false;
    }
    let fileSize = value.size;
    if (!fileSize) {
      fileSize = 2;
    }
    let mb = fileSize * 1024;
    return fileSize <= mb;
  },
  getMiles: (i) => {
    return (i * 0.000621371192).toFixed(1);
  },
  coupanTypeDiscount: (obj) => {
    let ctype = obj.couponType || 0;
    let price = obj.price || 0;
    let discount = obj.discount || 0;
    let minAmount = obj.minAmount || 0;
    let disUpto = obj.disUpto || 0;
    let disRate = 0;
    if (ctype == "FLAT PERCENT") {
      disRate = price >= minAmount ? (price * discount) / 100 : disRate;
    } else if (ctype == "FLAT PERCENT UPTO") {
      disRate = price >= minAmount ? (price * discount) / 100 : disRate;
      disRate = disRate <= disUpto ? disRate : disUpto;
    } else if (ctype == "CASH DISCOUNT UPTO") {
      disRate = price >= minAmount ? discount : disRate;
      disRate = disRate <= disUpto ? disRate : disUpto;
    }
    return parseFloat(disRate.toFixed(2));
  },
  isMobile: (num) => {
    var isphone =
      /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(num);
    return isphone;
  },
  coordinateLocal: async () => {
    let coordataL;
    function asignData(data) {
      coordataL = data;
    }
    await navigator.geolocation.getCurrentPosition(function (position) {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      let jsonCoords = {
        lat: lat,
        lng: lng,
      };
      jsonCoords = JSON.stringify(jsonCoords);
      asignData(jsonCoords);
      localStorage.setItem("geoLocal", jsonCoords);
    });
    return coordataL;
  },
  creditCardType: (cardType) => {
    let imageUrl;
    cardType = cardType.toLowerCase();
    switch (cardType) {
      case "visa":
        imageUrl = "card-logo-visa.svg";
        break;
      case "mastercard":
        imageUrl = "card-logo-mastercard.svg";
        break;
      case "american-express":
        imageUrl = "card-logo-amex.svg";
        break;
      default:
        imageUrl = "card-logo-unknown.svg";
    }
    return imageUrl;
  },
  imageValidate: ({extention, size, msg}) => {
    extention = extention || ["image/jpg", "image/jpeg", "image/png"];
    msg = msg || "You need to attach image";
    size = size || 1024 * 1024;
    let image = Yup.mixed()
      .required(msg)
      .test("fileSize", "The image is too large", (value) => {
        if (value == undefined || value == null) {
          return false;
        }
        return value && value?.size <= size;
      })
      .test(
        "type",
        `Only the following formats are accepted: ${extention}`,
        (value) => {
          if (value == undefined || value == null) {
            return false;
          }
          let fileType = value.type;
          return value && extention.indexOf(fileType) != -1;
        }
      ).test(
        "extention",
        `file extention should be small`,
        (value) => {
          if (value == undefined || value == null) {
            return false;
          }
          let ext = value.name.split('.').pop();
          return /[a-z]/.test(ext) && !/[A-Z]/.test(ext)
          // return value && extention.indexOf(fileType) != -1;
        }
      );
    return image;
  },
  uploadImage: async (values) => {
    let data;
    common.loader(true);
    const formData = new FormData();
    formData.append("file", values.userImage);
    data = await apiFunc
      .postUpload(formData)
      .then((res) => {
        return res.data.data;
      })
      .catch((error) => {
        common.error(error);
      });
    common.loader(false);
    return data;
  },
  error: (error) => {
    common.loader(false);
    var message = JSON.parse(error.request.response).message;
    toast.error(message);
    return message;
  },
  success: (message) => {
    common.loader(false);
    toast.success(message);
  },
  generateQOID: async () => {
    let resData = null;
    resData = await apiFunc
      .getOptionId()
      .then((res) => {
        return res.data.data;
      })
      .catch((error) => {
        common.error(error);
      });

    return resData;
  },
  bufferToBase64: (arr) => {
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    let buffer = btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
    return "data:image/png;base64," + buffer;
  },
  getImage: async (id) => {
    if (id) {
      let data;
      data = await apiFunc
        .getImage(id)
        .then((res) => {
          return common.bufferToBase64(res.data.data.Body.data);
        })
        .catch((error) => {
          common.error(error);
        });
      return data;
    }
  },
  aadharValidate: (num) => {
    let regexp = /^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/;
    return regexp.test(num);
  },
  isAlphabet: (event) => {
    return (
      (event.charCode >= 65 && event.charCode <= 90) ||
      (event.charCode >= 97 && event.charCode <= 122)
    );
  },
  rangMinDate: (date) => {
    if(date){
        let newdate = new Date(date);
        return newdate;
    }else{
        return new Date('2023-01-01')
    }
},
rangMaxDate: (date) => {
    if(date){
        let newdate = new Date(date);
        return newdate;
    }else{
        return new Date()
    }
},
  getBuildingsFilter: () => {
    const params = new URLSearchParams(window.location.search);
    let name = params.get("name");
    let email = params.get("email");
    let phone = params.get("phone");
    let report_year = params.get("report_year");
    let bbl = params.get("bbl");
    let dofGfa = params.get("dofGfa") || "";
    let propertyType = params.get("propertyType") || "";
    // let f2024 = params.get("f2024") || "";
    // let f2030 = params.get("f2030") || "";
    let fines_2024_29 = params.get("fines_2024_29") || "";
    let fines_2030_34 = params.get("fines_2030_34") || "";
    let activeBench = params.get("activeBench") || "";
    let eGrade = params.get("eGrade") || "";
    let activeEarcx = params.get("activeEarcx") || "";
    let address = params.get("address") || "";
    let lead = params.get("lead");
    let article3209 = params.get("article3209");
    let article32010 = params.get("article32010");
    let article321 = params.get("article321");
    let article320 = params.get("article320");
    let ll87Required = params.get("ll87Required");
    let ll88Required = params.get("ll88Required");
    let issueDate = params.get("issueDate");
    let bin = params.get("bin");
    let newPostData = {};
    newPostData.name = name || "";
    newPostData.email = email || "";
    newPostData.phone = phone || "";
    newPostData.report_year = report_year || "";
    newPostData.bbl = bbl || "";
    newPostData.dofGfa = dofGfa || "";
    newPostData.propertyType = propertyType;
    // newPostData.f2024 = f2024 || "";
    // newPostData.f2030 = f2030 || "";
    newPostData.fines_2024_29 = fines_2024_29 || "";
    newPostData.fines_2030_34 = fines_2030_34 || "";
    newPostData.activeBench = activeBench || "";
    newPostData.eGrade = eGrade || "";
    newPostData.activeEarcx = activeEarcx || "";
    newPostData.address = address || "";
    newPostData.lead = lead || "";
    newPostData.article3209 = article3209 || "";
    newPostData.article32010 = article32010 || "";
    newPostData.article321 = article321 || "";
    newPostData.article320 = article320 || "";
    newPostData.ll87Required = ll87Required || "";
    newPostData.ll88Required = ll88Required || "";
    newPostData.issueDate = issueDate || "";
    newPostData.bin = bin || "";
    return newPostData;
  },
  truncateAndClean: (str, length) => {
    if (!str || typeof str !== "string") return "";
    const cleanStr = str.replace(/(<([^>]+)>)/gi, "");
    if (typeof length !== "number" || length <= 0) return cleanStr;
    return cleanStr.length > length ? cleanStr.slice(0, length) + "..." : cleanStr;
  },
  capitalizeFirstLetter: (string) => {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return "";
  },
  version: () =>{
    return '0.0.1 '

  }
};

export default common;
