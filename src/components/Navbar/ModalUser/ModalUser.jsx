import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import "./modalUser.css"
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, toggleHiddenMenu } from '../../../redux/slices/userSlice';

const ModalUser = () => {
    const { currentUser, hiddenMenu } = useSelector(state => state.user)

    const dispatch = useDispatch();

    return (
        <AnimatePresence>
            {!hiddenMenu && (
                <motion.div className='modal-container'
                    initial={{ translateX: 600 }}
                    animate={{ translateX: 0 }}
                    exit={{ translateX: 600 }}
                    transition={{ duration: 0.5 }}
                    key='cart-user'
                >
                    <h2 className='username'>{currentUser?.nombre}</h2>
                    <Link to='/mis-ordenes'>Mis Ordenes</Link>
                    <span onClick={() => {
                        dispatch(setCurrentUser(null))
                        dispatch(toggleHiddenMenu())
                    }}>Cerrar Sesion</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ModalUser;