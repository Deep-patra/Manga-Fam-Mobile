import { type FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView } from 'react-native';

import {
 toggleStatus,
 toggleDemographic,
 toggleRating,
} from '../../redux/actions/filter.action';

import Selector from './selector';

interface ScrollContainerProps {
 mode: 'light' | 'dark';
}

const ScrollContainer: FC<ScrollContainerProps> = ({ mode }) => {
 const dispatch = useDispatch();

 const { status, rating, publication } = useSelector((state: any) => ({
  status: state.filter.status,
  rating: state.filter.contentRating,
  publication: state.filter.publicationDemographic,
 }));

 const changeStatus = (value: string) => {
  dispatch(toggleStatus(value));
 };
 const changeDemographic = (value: string) => {
  dispatch(toggleDemographic(value));
 };
 const changeRating = (value: string) => {
  dispatch(toggleRating(value));
 };

 return (
  <ScrollView>
   <Selector mode={mode} header="Status" items={status} toggle={changeStatus} />

   <Selector mode={mode} header="Rating" items={rating} toggle={changeRating} />

   <Selector mode={mode} header="Publication" items={publication} toggle={changeDemographic} />
  </ScrollView>
 );
};

export default ScrollContainer;
