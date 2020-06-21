import { ConnectedProps, connect } from "react-redux";
import Knight from "domain/Knight";
import { UPDATE_KNIGHT } from "store/system/types";

type PropsFromRedux = ConnectedProps<typeof connector>

export type Props = PropsFromRedux;

interface RootState {
  knight: Knight,
}

export const mapState = (state: RootState) => ({
  knight: state.knight
}
)

export const mapDispatch = {
  updateKnight: (knight: Knight) => (
    { type: UPDATE_KNIGHT, payload: knight }
  )
}
export const connector = connect(
  mapState,
  mapDispatch
)

