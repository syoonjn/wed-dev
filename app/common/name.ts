
export const getCouple = () => {

    /** 신랑 성+이름 */
    const groomFullName = process.env.NEXT_PUBLIC_GROOM_NAME || '';

    /** 신랑 이름 */
    const groomFirstName = groomFullName.toString().substring(1);

    /** 신부 성+이름 */
    const brideFullName = process.env.NEXT_PUBLIC_BRIDE_NAME || '';

    /** 신부 이름 */
    const brideFirstName = brideFullName.toString().substring(1);

    return { brideFullName, groomFullName, brideFirstName, groomFirstName };
};

export const getParent = () => {

    /** 신랑 아버지 이름 */
    const groomFatherName = process.env.NEXT_PUBLIC_GROOM_FATHER_NAME || '';

    /** 신랑 어머니 이름 */
    const groomMatherName = process.env.NEXT_PUBLIC_GROOM_MOM_NAME || '';

    /** 신부 아버지 이름 */
    const brideFatherName = process.env.NEXT_PUBLIC_BRIDE_FATHER_NAME || '';

    /** 신부 어머니 이름 */
    const brideMatherName = process.env.NEXT_PUBLIC_BRIDE_MOM_NAME || '';

    return { groomFatherName, groomMatherName, brideFatherName, brideMatherName };

}
export default { getCouple, getParent };
