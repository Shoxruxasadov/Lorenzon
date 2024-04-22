import Rodal from "rodal"
import { useStore } from "../../store/zustand";

export default function RodalLoading() {
    const loading = useStore(state => state.loading);

    return (
        <Rodal className="rodal-loading" visible={loading}>
            <span className="loader"></span>
        </Rodal>
    )
}