import { IonButton, IonCard, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Quiz from '../components/quiz';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
        <IonContent fullscreen>
        <Quiz/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
