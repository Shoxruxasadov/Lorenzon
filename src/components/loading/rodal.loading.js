import Rodal from "rodal"
import { useStore } from "../../store/zustand";

export default function RodalLoading() {
    const loading = useStore(state => state.loading);
    const setLoading = useStore(state => state.setLoading);

    return (
        <Rodal className="rodal-loading" visible={loading} onClose={() => setLoading(false)}>
            <span className="loader"></span>
        </Rodal>
    )
}