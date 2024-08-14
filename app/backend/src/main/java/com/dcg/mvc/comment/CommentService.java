package com.dcg.mvc.comment;

import com.dcg.mvc.lecture.Lecture;
import com.dcg.mvc.lecture.LectureRepository;
import com.dcg.mvc.user.User;
import com.dcg.mvc.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private LectureRepository lectureRepository;

    @Transactional
    public Comment addCommentToLecture(int lectureId, Comment comment, Authentication connectedUser) {
        // Find the lecture by ID
        Lecture lecture = lectureRepository.findById(lectureId)
                .orElseThrow(() -> new RuntimeException("Lecture not found"));

        // Set the comment properties
        comment.setLecture(lecture);
        comment.setUserName(((User) connectedUser.getPrincipal()).getUsername()); // Assuming you want the username

        // Add comment to lecture
        lecture.getComments().add(comment);

        // Save the comment and the lecture
        commentRepository.save(comment);
        lectureRepository.save(lecture);

        return comment;
    }
}
