import React from 'react';
import './WriteCard.css';

function WriteCard({title, content, author, heading, _onSubmit, _handleCloseModal, _handleValues}){
    return <div className='card write-card'>
        <div className='right-align card-head'>
            <span className='title'>{heading}</span>
            <button className='close button' onClick={_handleCloseModal}>&times;</button>
        </div>
        <form onSubmit={_onSubmit} className='card-form'>
            <label htmlFor="title">Title</label>
            <input name="title" className='text-field' type='text' value={title} maxLength="100" onChange={({target:{value}})=>_handleValues('title', value)} required></input>
            <label htmlFor="content">Content</label>
            <textarea className='text-field' name="content" rows="5" maxLength='500'value={content} onChange={({target:{value}})=>_handleValues('content', value)} required></textarea>
            <label htmlFor="content">Author</label>
            <input className='text-field' type='text'value={author} maxLength="30" onChange={({target:{value}})=>_handleValues('author', value)} required></input><br/><br/>
            <span className='right-align'><input className='button' type='submit'></input></span>
        </form>
    </div>
}

export default WriteCard;