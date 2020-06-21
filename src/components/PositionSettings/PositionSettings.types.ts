import { ConnectedProps, connect } from "react-redux";
import { Nullable } from "generics/Nullable";
import { PositionType, UPDATE_POSITION_LISTENER, UPDATE_START_POSITION, UPDATE_END_POSITION } from "store/system/types";
import Cords from "domain/Cords";

type PropsFromRedux = ConnectedProps<typeof connector>

export type Props = PropsFromRedux & {
  position: Nullable<Cords>,
  name: PositionType;
  enableSetter: boolean;
}


const mapState = (state: {}) => ({});

const mapDispatch = {
  updatePositionListener: (position: Nullable<PositionType>) => {
    return { type: UPDATE_POSITION_LISTENER, payload: position };
  },
  resetStartPosition: () => ({ type: UPDATE_START_POSITION, payload: null }),
  resetEndPosition: () => ({ type: UPDATE_END_POSITION, payload: null })
}
export const connector = connect(
  mapState,
  mapDispatch
)
