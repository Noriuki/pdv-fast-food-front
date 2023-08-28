import OrdersList from "@/components/OrdersList";
import { Status } from "@/types";

export default function Cozinha() {

    return (
        <div className="max-w-screen-lg w-full flex flex-wrap mx-auto my-4">

            <div className="flex flex-wrap flex-col w-1/2 p-4 border-r border-black">
                <h3>Preparando:</h3>
                <OrdersList filterByStatus={Status.PENDING} />
            </div>

            <div className="flex flex-wrap w-1/2 p-4 flex-col">
                <h3>Pronto:</h3>
                <OrdersList filterByStatus={Status.FINISHED} />
            </div>

        </div>
    );
}
