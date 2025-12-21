import { useEffect } from "react";
import { Fancybox as NativeFancybox } from "@fancyapps/ui";

const FancyboxWrapper = ({ children }) => {
  useEffect(() => {
    NativeFancybox.bind("[data-fancybox]", {
      animated: true,
      showClass: "fancybox-fadeIn",
      hideClass: "fancybox-fadeOut",
      dragToClose: true,
      Images: {
        zoom: true,
      },
    });

    return () => {
      NativeFancybox.destroy();
    };
  }, []);

  return children;
};

export default FancyboxWrapper;
