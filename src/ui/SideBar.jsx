import styled from "styled-components";

const StyledSideBar = styled.aside`
	background-color: var(--color-gray-0) blue;
	padding: 3.2rem 2.4rem;
	border-bottom: 1px solid var(--color-gray-100);
	grid-row: 1/-1;
`;
function SideBar() {
	return <StyledSideBar>Sidebar</StyledSideBar>;
}

export default SideBar;
