package com.elpracticante.backend.intership;

import com.elpracticante.backend.intership.api.IntershipServiceAPI;
import com.elpracticante.backend.intership.dto.CreateIntershipRequest;
import com.elpracticante.backend.intership.dto.CreateIntershipResponse;
import com.elpracticante.backend.intership.entity.IntershipEntity;
import com.elpracticante.backend.intership.repository.IntershipRepository;
import com.elpracticante.backend.shared.exceptions.EmptyInputFieldException;
import org.springframework.stereotype.Service;

import static com.elpracticante.backend.shared.utils.DateUtils.getFormattedLocalDate;

@Service
public class IntershipService implements IntershipServiceAPI {

    private final IntershipRepository intershipRepository;

    public IntershipService(IntershipRepository intershipRepository) {
        this.intershipRepository = intershipRepository;
    }

    @Override
    public CreateIntershipResponse addStudent(CreateIntershipRequest createIntershipRequest) throws EmptyInputFieldException {

        Integer intershipCreatedId = createIntership(createIntershipRequest);

        return null;
    }

    private Integer createIntership(CreateIntershipRequest createIntershipRequest) {
        IntershipEntity intershipEntity = new IntershipEntity();
        intershipEntity.setDescription(createIntershipRequest.description());
        intershipEntity.setStartDate(getFormattedLocalDate(createIntershipRequest.startDate()));
        intershipEntity.setEndDate(getFormattedLocalDate(createIntershipRequest.endDate()));
        return null;
    }
}
