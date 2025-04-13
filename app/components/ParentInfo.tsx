import { getCouple, getParent } from "../common/name";


const ParentInfo = () => {

    const { groomFatherName, groomMatherName, brideFatherName, brideMatherName } = getParent();
    const { groomFirstName, brideFirstName } = getCouple();

    return (
        <div className="mt-6 text-sm sm:text-[17px] text-[#3d3d3d] text-center leading-[2.2]">
            <table className="table-fixed mx-auto">
                <tbody>
                    <tr>
                        <td className="px-2 font-semibold">{groomFatherName}</td>
                        <td className="px-1">·</td>
                        <td className="px-2 font-semibold">{groomMatherName}</td>
                        <td className="px-1">의</td>
                        <td className="text-[#744936] font-semibold">아들</td>
                        <td className="px-2 font-semibold">{groomFirstName}</td>
                    </tr>
                    <tr>
                        <td className="px-2 font-semibold">{brideFatherName}</td>
                        <td className="px-1">·</td>
                        <td className="px-2 font-semibold">{brideMatherName}</td>
                        <td className="px-1">의</td>
                        <td className="text-[#744936] font-semibold">딸</td>
                        <td className="px-2 font-semibold">{brideFirstName}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};



export default ParentInfo;