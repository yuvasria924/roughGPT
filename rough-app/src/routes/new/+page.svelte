<script>
     function resizeTextarea(event) {
    const textarea = event.target;
    textarea.style.height = "auto";  // Reset height
    textarea.style.height = textarea.scrollHeight + "px";  // Adjust height based on content
  }
  </script>
  
  <main class="container">
  <button class="search-btn"> Search My Notes! </button>
  <textarea cols="30" rows="30" placeholder="Write a Note Here!" on:input={resizeTextarea}>  </textarea>
  <button class="save-btn">Save Note</button>
  </main>
  
  <style>
 @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }



    .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    margin-top: 50px;
    max-width: 70vw;
    margin-left: auto;
    margin-right: auto;
    background: linear-gradient(135deg, #f8d45c, #ff96b9, #ffabad, #fad0c4);
    background-size: 300% 300%;
    animation: gradientAnimation 4s ease infinite;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }

  .search-btn, .save-btn {
    margin: 1rem 0;
    padding: 1rem;
    border-radius: 3rem;
    border: none;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    width:72%;
  }

  .search-btn {
    background: #199c75ee;
    color: white;
  }

  .save-btn {
    background: #199c75ee;
    color: white;
  }

  .search-btn:hover {
    background: #000000;
    transform: scale(1.05);
  }

  .save-btn:hover {
    background: #000000;
    transform: scale(1.05);
  }

  textarea {
    width: 100%;
    max-width: 80%;
    min-height: 200px;
    border-radius: 1rem;
    padding: 1rem;
    font-size: 16px;
    border: 2px solid #ddd;
    transition: border 0.3s ease-in-out;
    resize: none;
    overflow-y: hidden; /* Hides scrollbar while auto-expanding */
  }

  textarea:focus {
    border: 2px solid #ff7eb3;
    outline: none;
  }

  @media (max-width: 600px) {
    .container {
      padding: 1.5rem;
    }

    .search-btn, .save-btn {
      font-size: 18px;
      padding: 0.8rem;
    }

    textarea {
      font-size: 14px;
    }
  }
</style>
  