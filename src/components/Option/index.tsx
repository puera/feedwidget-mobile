import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
  ImageProps,
  Text
} from 'react-native'
import { styles } from './styles';

type Props = {
  title: string;
  image: ImageProps
} & TouchableOpacityProps

export function Option({title, image, ...rest}: Props) {
 return (
    <TouchableOpacity
        style={styles.container}
        {...rest}
    >
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
 );
}