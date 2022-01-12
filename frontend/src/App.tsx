import { AuthProvider } from 'lib/auth';
import { Router } from 'react-location';
import { location, routes } from 'routes';

function App(): React.ReactElement {
  return (
    <AuthProvider>
      <Router location={location} routes={routes} />
    </AuthProvider>
  );
}

export default App;
