import styled from 'styled-components';

export const SquareWrapper = styled.div<{ squareHeight: number; boardSize: number }>`
height:${props => props.squareHeight}px;
flex-basis:${props => (100 / props.boardSize)}%`;