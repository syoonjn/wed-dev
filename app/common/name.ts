import { useEffect } from "react";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const getCouple = () => {
    const groomFullName = process.env.NEXT_PUBLIC_GROOM_NAME || '';
    const groomFirstName = groomFullName.toString().substring(1);

    const brideFullName = process.env.NEXT_PUBLIC_BRIDE_NAME || '';
    const brideFirstName = brideFullName.toString().substring(1);


    return { brideFullName, groomFullName, brideFirstName, groomFirstName };
};
export default getCouple;
