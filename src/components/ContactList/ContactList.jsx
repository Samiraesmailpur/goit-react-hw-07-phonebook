import React from 'react';
import PropTypes from 'prop-types';
import {
  Contacts,
  ContactItem,
  ContactText,
  DeleteBtn,
} from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/operations';
import { selectContacts, selectFilter } from '../../redux/selectors';

const ContactList = () => {
  const dispatch = useDispatch();
  const { contacts } = useSelector(selectContacts);

  const stateFilter = useSelector(selectFilter);

  const filterNames = contacts.filter(contact => {
    return contact.name
      .toLowerCase()
      .includes(stateFilter.filters.toLowerCase());
  });

  return (
    <Contacts>
      {filterNames.length > 0 &&
        filterNames.map(({ id, name, number }) => (
          <ContactItem key={id}>
            <ContactText>
              {name}: {number}
            </ContactText>
            <div>
              <DeleteBtn
                type="button"
                onClick={() => dispatch(deleteContact(id))}
              >
                Delete
              </DeleteBtn>
            </div>
          </ContactItem>
        ))}
    </Contacts>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactList;
