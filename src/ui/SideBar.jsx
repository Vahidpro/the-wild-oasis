import styled from "styled-components";
import MainNav from "./MainNav";
import Logo from "./Logo";

const StyledSideBar = styled.aside`
	background-color: var(--color-gray-0) blue;
	padding: 3.2rem 2.4rem;
	border-bottom: 1px solid var(--color-gray-100);
	grid-row: 1/-1;

	display: flex;
	flex-direction: column;
	gap: 3.2rem;
`;
function SideBar() {
	return (
		<StyledSideBar>
			<Logo />
			<MainNav></MainNav>
		</StyledSideBar>
	);
}

export default SideBar;
