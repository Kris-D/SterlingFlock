const menuItems = document.querySelectorAll('.menu-item');


// ******* Message *******
const messagesNotification = document.querySelector ('#message-notification');
const messages = document.querySelector('.messages');
const message = Array.from(messages.querySelectorAll('.message'));
const messageSearch = document.querySelector('#message-search');

// ************ Friend Request Accept/Decline ***********
const requestButtons = document.querySelectorAll('.request-btn');

// *********** Post Like Functionality ************
const likeButtons = document.querySelectorAll('.like-btn');



// remove active class from all menu items
const changeActiveItem = () => {
    menuItems.forEach(item => {
        item.classList.remove('active');
    })
}
//************* SideBar **********/

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        changeActiveItem();
        item.classList.add('active');
        if(item.id != 'notifications'){
            document.querySelector('.notification-popup').style.display = 'none';
        } else{
            document.querySelector('.notification-popup').style.display = 'block';
            document.querySelector('#notifications .notification-count').style.display = 'none';
        }
    })
})



// ***** Search chats
const searchMessage = () => {
    const val = messageSearch.value.toLowerCase();

    message.forEach (user => {
        let name = user.querySelector('h5').textContent.toLowerCase();
        if(name.indexOf(val) != -1){
            user.style.display = 'flex';
        } else{
            user.style.display = 'none';
        }

    })
}

// ***** Search chats
messageSearch.addEventListener('keyup', searchMessage);






//************* Messages **********/
messagesNotification.addEventListener('click', () => {
    messages.style.boxShadow = '0 0 1rem var(--color-sterling-red)';
    messagesNotification.querySelector('.notification-count').style.display = 'none';
    setTimeout(() => {
        messages.style.boxShadow = 'none';
    },2500);
})


// ************ Friend Request Accept/Decline ***********

requestButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const action = e.target.dataset.action; // accept or decline
        const requestId = e.target.dataset.id; // unique request id
        if(action === 'accept') {
            // handle friend acceptance logic here
            console.log(`Accepted friend request: ${requestId}`);
        } else if(action === 'decline') {
            // handle friend decline logic here
            console.log(`Declined friend request: ${requestId}`);
        }
        // Remove the request element from the DOM
        button.closest('.request').remove();
    });
});

// *********** Post Like Functionality ************
likeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Find the nearest likes-count element in the post
        const post = button.closest('.action-button').nextElementSibling; // Finding the related liked-by section
        const likesCount = post.querySelector('.likes-count');
        let currentCount = parseInt(likesCount.textContent.replace(',', ''));  // Remove comma for parsing
        
        // Toggle like status
        if(button.classList.contains('liked')) {
            likesCount.textContent = (currentCount - 1).toLocaleString();  // Decrease count and format
            button.classList.remove('liked');  // Remove 'liked' class
        } else {
            likesCount.textContent = (currentCount + 1).toLocaleString();  // Increase count and format
            button.classList.add('liked');  // Add 'liked' class
        }
    });
});
