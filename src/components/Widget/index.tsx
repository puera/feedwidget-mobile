import React, { useRef, useState } from 'react';
import { ChatTeardropDots } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import Bottomsheet from '@gorhom/bottom-sheet';
import { theme } from '../../theme';


import { styles } from './styles'
import { Options } from '../Options';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Form } from '../Form';
import { Success } from '../Success';

export type FeedBackType = keyof typeof feedbackTypes

function WidgetHoc () {
  const [feedbackType, setFeedbackType] = useState<FeedBackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const bottomSheetRef = useRef<Bottomsheet>(null);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }

  function handleRestartFeedback() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <ChatTeardropDots size={24} color={theme.colors.text_on_brand_color} />
      </TouchableOpacity>
      <Bottomsheet 
        ref={bottomSheetRef}
        snapPoints={[1,280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
        
        >
        { feedbackSent ? <Success onSendAnotherFeedback={handleRestartFeedback} />
        : 
        <>
          {feedbackType ? <Form onFeedbackRestarted={handleRestartFeedback} onFeedbackSent={() => setFeedbackSent(true)} feedbackType={feedbackType} /> : <Options onFeedbackTypeChanged={setFeedbackType} />}
        </> }
        </Bottomsheet>
    </>
  );
}

export const Widget = gestureHandlerRootHOC(WidgetHoc)