package com.careerpilot.company.controller;

import com.careerpilot.company.dto.CompanyDto;
import com.careerpilot.company.service.CompanyService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class CompanyControllerTest {

    private MockMvc mockMvc;

    @Mock
    private CompanyService companyService;

    @InjectMocks
    private CompanyController companyController;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(companyController).build();
    }

    @Test
    void getAllCompanies_Success() throws Exception {
        CompanyDto dto = CompanyDto.builder()
                .id(1L)
                .name("Google")
                .normalizedName("google")
                .website("https://google.com")
                .status("ACTIVE")
                .roles(List.of())
                .build();

        when(companyService.getAllCompanies()).thenReturn(List.of(dto));

        mockMvc.perform(get("/api/v1/companies")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Google"))
                .andExpect(jsonPath("$[0].normalizedName").value("google"));
    }
}
