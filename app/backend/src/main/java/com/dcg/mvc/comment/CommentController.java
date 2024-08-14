package com.dcg.mvc.comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/lectures/{lectureId}")
    public ResponseEntity<Comment> addCommentToLecture(
            @PathVariable int lectureId,
            @RequestBody Comment comment,
            Authentication authentication) {
        try {
            // Call the service to add the comment to the lecture
            Comment addedComment = commentService.addCommentToLecture(lectureId, comment, authentication);
            return new ResponseEntity<>(addedComment, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            // Handle exceptions and return a meaningful error response
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}
