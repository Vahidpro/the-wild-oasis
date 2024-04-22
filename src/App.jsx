import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";

const StyledApp = styled.main`
	padding: 20px;
`;

function App() {
	return (
		<>
			<GlobalStyles />
			<StyledApp>
				<Heading as="h1">The Wild Oasis</Heading>
				<Button>Check in</Button>
				<Input />
			</StyledApp>
		</>
	);
}

export default App;
